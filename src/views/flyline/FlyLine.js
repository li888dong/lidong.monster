"use strict"
var flyLine = {
    time: 0,
    ctx: null,
    canvas: null,
    animTime:null,
    points: [{
        start: [50, 50],
        end: [400, 400]
    }],
    init: function (options) {
        this.time = options.time||0
        this.ctx = options.ctx
        this.canvas = options.canvas

        if (options.points){
            this.points = options.points
            if(this.animTime){
                cancelAnimationFrame(this.animTime)
            }
            this.draw()

        }else{
            return
        }
    },
    /**
     *渐变线
     * */
    createGradient: function (ctx, p0, p1) {
        var grd = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
        grd.addColorStop(0, 'rgba(255,0,255,0)');
        grd.addColorStop(1, 'rgba(255,0,255,1)');
        return grd;
    },
    /**
     *二次贝塞尔曲线公式
     * */
    computeCurvePoint: function (a0, a1, a2, t) {
        var b = (1 - t) * (1 - t) * a0 + 2 * (1 - t) * t * a1 + t * t * a2;
        return b;
    },
    /**
     *画一条二次贝塞尔曲线
     * */
    drawQuadraticCurve: function (p0, p1, p2) {
        this.ctx.save();
        this.ctx.strokeStyle = '#26fdfb';
        this.ctx.lineWidth = 1;
        this.ctx.shadowBlur = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(p0.x, p0.y);
        this.ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
        this.ctx.stroke();
        this.ctx.restore();
    },
    /**
     *描绘曲线的前面的点
     * */
    iter: function (t, p0, p1, p2) {
        this.ctx.beginPath();
        this.ctx.moveTo(p0.x, p0.y);
        // 分成100份，显示最后一分，根据二次贝塞尔曲线路径绘制
        for (var i = 1; i < 100; i++) {
            var tt = t / 100 * i;
            var pb = {};
            pb.x = this.computeCurvePoint(p0.x, p1.x, p2.x, tt);
            pb.y = this.computeCurvePoint(p0.y, p1.y, p2.y, tt);
            this.ctx.shadowColor = 'rgba(255,0,255,1)';
            this.ctx.strokeStyle = this.createGradient(this.ctx, p0, p2);
            this.ctx.lineWidth = 3;
            this.ctx.shadowBlur = 3;
            this.ctx.lineTo(pb.x, pb.y);
        }
        this.ctx.stroke();
    },
    arc:function(ctx,...ps) {
        ps.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.stroke();
        });
    },
    /**
     *描绘曲线
     * */
    draw: function () {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var _this = this;
        this.points.forEach(function (point) {
            var ab = Math.sqrt((point.start[0]-point.end[0])**2+(point.start[1]-point.end[1])**2)

            var p0 = {x: point.start[0], y: point.start[1]};
            var p1x,p1y;
            if (point.start[0]>point.end[0]){
                p1x = point.end[0]+ab/2
            }else{
                p1x = point.start[0]+ab/2
            }
            if (point.start[1]>point.end[1]){
                p1y = point.start[1]-ab*Math.sqrt(3)/2
            }else{
                p1y = point.end[1]-ab*Math.sqrt(3)/2
            }
            var p1 = {x: p1x, y: p1y};
            var p2 = {x: point.end[0], y: point.end[1]};

            _this.drawQuadraticCurve(p0, p1, p2)
            _this.iter(_this.time, p0, p1, p2)

            var pb = {};
            pb.x = _this.computeCurvePoint(p0.x, p1.x, p2.x, _this.time);
            pb.y = _this.computeCurvePoint(p0.y, p1.y, p2.y, _this.time);


            _this.ctx.save();//保存当前环境的状态。一个保存点，restore可返回此点
            _this.ctx.lineCap = 'round';
            _this.ctx.lineWidth = 3;
            _this.ctx.strokeStyle = _this.createGradient(_this.ctx, p0, p2);
            _this.ctx.shadowColor = 'rgba(255,0,255,1)';
            _this.ctx.shadowBlur = 3;
            _this.arc(_this.ctx, pb);
        })

        this.ctx.restore();//返回save时的状态


        this.time += 0.01;
        if (this.time > 1) {
            this.time = 0;
        }
        this.animTime = requestAnimationFrame(this.draw.bind(this));
    },
}
