<template>
    <div class="img-annotate-container" >
        <div class="img-annotate-box" style="z-index:0"  v-bind:style="boxStyle"></div>
        <img :src="imgSrc" :style="imgStyle"></img>

        <!--<img :key="imgId" :src="imgSrc" :style="imgStyle"></img>-->
    </div>
</template>

<script>
//    import configService from '@/service/ConfigService';
//    import imgZoom from './imgZoom.vue'
    export default {
        name: 'ImageBox',
        components: {
        },
        props: {
            imgSrc: {
                type: String,
                required: true
            },
            annotate: {
                type: Array
            },
            imgWidth: {
                type: Number
            },
            imgHeight: {
                type: Number
            },
            imgId: {
                type: String
            },
            previewSrc: {
                type: String
            }
        },
        data () {
            return {
                imgFitWidth: 0,
                imgFitHeight: 0,
                fitScale: 1,
                imgStyle: {
                },
                boxStyle: {

                },
                picBox: {

                }
            }
        },
        mounted() {
            var cw = this.$el.clientWidth;// parseInt($(".img-annotate-container").css("width").replace("px","")); //this.$el.clientWidth;
            var ch = Math.max(320, this.$el.clientHeight);
            //console.log('client width ' + cw);
//            if (this.imgWidth > this.imgHeight) {
                this.fitScale = cw / this.imgWidth;
//            } else {
//                this.fitScale = ch / this.imgHeight;
//            }

            this.imgFitWidth = parseInt(this.imgWidth * this.fitScale, 10);
            this.imgFitHeight = parseInt(this.imgHeight * this.fitScale, 10);

            this.imgStyle = {
                width: this.imgFitWidth + 'px',
//                height: this.imgFitHeight + 'px'
            };
            this.imgBox = [4];
            var annotates = eval(this.annotate);
            for (var i = 0; i < 4; i++) {
                this.imgBox[i] = annotates[i];
            }
            this.boxFitSize = [4];
            for (var i = 0; i < this.imgBox.length; i++) {
                this.boxFitSize[i] = parseInt(this.imgBox[i] * this.fitScale, 10);
            }

            this.boxFitLeft = this.boxFitSize[0];
            this.boxFitTop = this.boxFitSize[1];
            this.boxFitRight = this.boxFitSize[2];
            this.boxFitBottom = this.boxFitSize[3];
            this.boxFitWidth = this.boxFitRight - this.boxFitLeft;
            this.boxFitHeight = this.boxFitBottom - this.boxFitTop;
            this.boxStyle = {
                left: this.boxFitLeft + 'px',
                top: this.boxFitTop + 'px',
                width: this.boxFitWidth + 'px',
                height: this.boxFitHeight + 'px',
                zIndex: 10000
            };
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .picture-item{
        width: 360px; margin:10px 0px 0px; float: left;
        -webkit-transition-duration: 0.7s;
        -moz-transition-duration: 0.7s;
        -ms-transition-duration: 0.7s;
        -o-transition-duration: 0.7s;
        transition-duration: 0.7s;
    }
    .img-annotate-container{
        border: solid 1px #ccc;
        background-position: left top;
        background-repeat: no-repeat;
        display: block;
        margin: 0px;
        padding: 0px;
        left:0px;
        top:0px;
        overflow: hidden;
    }
    .img-annotate-img{
        position: relative;
        z-index: 100;
    }
    .img-annotate-box{
        z-index: 200;
        border: solid 1px #f00;
        position: absolute;
    }
</style>
