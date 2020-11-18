<template>
    <canvas id="flyCanvas" ref="flyCanvas"></canvas>
</template>

<script>
    export default {
        name: "flyline-canvas",
        data(){
            return{
                time:0,
                ctx:null,
                canvas:null,
                point:{
                    start:[50,50],
                    end:[400,400]
                }
            }
        },
        mounted() {
            this.canvas = document.getElementById('flyCanvas');
            this.ctx = this.canvas.getContext('2d');
            this.draw()
        },
        methods: {
            createGradient(ctx, p0, p1) {
                var grd = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
                grd.addColorStop(0, 'rgba(255,0,255,0)');
                grd.addColorStop(1, 'rgba(255,0,255,1)');
                return grd;
            },
            arc(ctx,...ps) {
                ps.forEach(p => {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                    ctx.stroke();
                });
            },
            computeCurvePoint(a0,a1,a2,t){
                let b =  (1 -t)*(1-t) * a0 + 2 *(1-t) * t * a1 + t * t * a2;
                return b;
            },
            draw() {
                let p0 = {x:this.point.start[0],y:this.point.start[1]},
                    p1 = {x:this.point.end[0],y:this.point.start[1]},
                    p2 = {x:this.point.end[0],y:this.point.end[1]};
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                this.iter(this.time,p0,p1,p2)


                let pb = {};
                pb.x = this.computeCurvePoint(p0.x,p1.x,p2.x,this.time);
                pb.y = this.computeCurvePoint(p0.y,p1.y,p2.y,this.time);


                this.ctx.save();//保存当前环境的状态。一个保存点，restore可返回此点
                this.ctx.lineCap = 'round';
                this.ctx.lineWidth =3;
                this.ctx.strokeStyle = this.createGradient(this.ctx,p0,p2);
                this.ctx.shadowColor = 'rgba(255,0,255,1)';
                this.ctx.shadowBlur = 2;
                this.arc(this.ctx,pb);
                this.ctx.restore();//返回save时的状态


                this.time += 0.01;
                if(this.time > 1){
                    this.time = 0;
                }
                requestAnimationFrame(this.draw);
            },
            iter(t,p0,p1,p2){
                this.ctx.beginPath();
                this.ctx.moveTo(p0.x,p0.y);
                // 分成100份，显示最后一分，根据二次贝塞尔曲线路径绘制
                for(var i = 1;i < 100; i ++){
                    var tt = t/100 * i;
                    var pb = {};
                    pb.x = this.computeCurvePoint(p0.x,p1.x,p2.x,tt);
                    pb.y = this.computeCurvePoint(p0.y,p1.y,p2.y,tt);
                    this.ctx.shadowColor = 'rgba(255,0,255,1)';
                    this.ctx.strokeStyle = this.createGradient(this.ctx,p0,p2);
                    this.ctx.lineWidth =8;
                    this.ctx.shadowBlur = 1;
                    this.ctx.lineTo(pb.x,pb.y);
                }
                this.ctx.stroke();
            },
            // 画一条二次贝塞尔曲线
            drawQuadraticCurve(p0,p1,p2){
                this.ctx.save();
                this.ctx.strokeStyle = 'blue';
                this.ctx.beginPath();
                this.ctx.moveTo(p0.x,p0.y);
                this.ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
                this.ctx.stroke();
                this.ctx.restore();
            }
        }
    }
</script>

<style scoped>
    #flyCanvas {
        background-color: white;
    }
</style>
