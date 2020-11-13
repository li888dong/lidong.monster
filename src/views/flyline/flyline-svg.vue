<template>
    <div>
        <svg>
            <path
                    fill="none"
                    stroke="#FFFFFF"
                    d="M50, 50 C70, 200 200, 200  800, 280"
                    id="line"
            ></path>
        </svg>
    </div>
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "flyline",
        data(){
            return{
                percent:0,
                pointNum:1500,
                lineLen:150,
                speed:15,
                radius:2.5,
                fill:'rgb(255, 200, 65)',
                circles:[]
            }
        },
        mounted() {
            this.percent = this.length;
            this.circles = this.getLinePoints('line',this.pointNum)
            this.animate()
        },
        methods:{
            getLinePoints(nodeId,pointNum){
                const path = d3.select(`#${nodeId}`)
                const points = []
                const pathline = path.node()
                const totalLength = pathline.getTotalLength()// getTotalLength 调用该方法会返回该path元素从起始点到终点的总长度（浮点数）。

                const unit = totalLength / pointNum

                //getPointAtLength 调用该方法会根据传入到起点的距离值来计算返回对应的path元素坐标点的位置x、y值。
                for (let i = 0; i <= pointNum; i += 1) {
                    points.push(pathline.getPointAtLength(i * unit))
                }

                return points
            },
            getLine(){


            },
            drawCircle(cx, cy, i) {
                const {radius, circles, fill} = this
                if (circles[i]) {
                    circles[i].attr("cx", cx).attr("cy", cy)
                } else {
                    circles.push(
                        circleG1
                            .append("circle")
                            .attr("cx", cx)
                            .attr("cy", cy)
                            .attr("r", radius)
                            .attr("fill", fill)
                            .attr('fill-opacity', i * 0.001)
                    )
                }
            },
            drawFlyLine(){
                const {circles, percent, lineLen} = this
                for (let i = percent - lineLen, j = 0; i < percent; i += 1, j += 1) {
                    this.drawCircle(circles[i].x, circles[i].y, j)
                }
            },
            animate() {
                const {lineLen, speed, totalNum} = this
                this.drawFlyLine()
                this.percent = this.percent + speed > totalNum ? len : this.percent + speed
                requestAnimationFrame(() => this.animate())
            }
        }
    }
</script>

<style scoped>

</style>
