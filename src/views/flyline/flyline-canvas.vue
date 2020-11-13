<template>
    <div>
        <canvas id="flyCanvas" ref="flyCanvas" width="500" height="500"></canvas>
    </div>
</template>

<script>
    export default {
        name: "flyline-canvas",
        data(){
            return{
                time:0,
                ctx:null,
                canvas:null
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
                let p0 = {x:100,y:100},
                    p1 = {x:200,y:100},
                    p2 = {x:200,y:200};
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                // this.ctx.save();
                // this.ctx.strokeStyle = 'red';
                // this.arc(this.ctx,p0,p1,p2);
                // this.ctx.restore();

                // this.ctx.save();
                // this.ctx.strokeStyle = 'blue';
                // this.ctx.beginPath();
                // this.ctx.moveTo(p0.x,p0.y);
                // this.ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
                // this.ctx.stroke();
                // this.ctx.restore();

                this.iter(this.time,p0,p1,p2)


                let pb = {};
                pb.x = this.computeCurvePoint(p0.x,p1.x,p2.x,this.time);
                pb.y = this.computeCurvePoint(p0.y,p1.y,p2.y,this.time);
                this.ctx.save();
                this.ctx.lineCap = 'round';
                this.ctx.lineWidth =3;
                this.ctx.strokeStyle = this.createGradient(this.ctx,p0,p2);
                this.ctx.shadowColor = 'rgba(255,0,255,1)';
                this.ctx.shadowBlur = 5;
                // this.arc(this.ctx,pb);
                // this.ctx.restore();
                this.time += 0.01;

                if(this.time > 1){
                    this.time = 0;
                }
                requestAnimationFrame(this.draw);
            },
            iter(t,p0,p1,p2){
                this.ctx.beginPath();
                this.ctx.moveTo(p0.x,p0.y);
                for(var i = 1;i < 100; i ++){
                    var tt = t/100 * i;
                    var pb = {};
                    pb.x = this.computeCurvePoint(p0.x,p1.x,p2.x,tt);
                    pb.y = this.computeCurvePoint(p0.y,p1.y,p2.y,tt);
                    this.ctx.shadowColor = 'rgba(255,0,255,1)';
                    this.ctx.shadowBlur = 1;
                    this.ctx.lineTo(pb.x,pb.y);
                }
                this.ctx.stroke();
            }
        }
    }
</script>

<style scoped>
    #flyCanvas {
        /*background-color: white;*/
    }
</style>
