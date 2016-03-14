/**
 * Created by newsonghe on 2015/6/13 0013.
 */
/*
 Defines the Card object.
 @author jwill
 */
function Cube() {
    if ( !(this instanceof arguments.callee) ) {
        return new arguments.callee(arguments);
    }

    var meta;               //用于记录其他信息
    var ord;                //序号
    var xPos;               //x坐标
    var yPos;               //y坐标
    var CubeBack;           //对象

    var width = 169;
    var height = 245;

    var self = this;



    self.init = function() {
        self.meta = new Object();
    }

    self.drawCard = function() {
        var score = self.ord;
        var a = 0;
        do
        {
            if(score == 0)
            {
                break;
            }
            score /= 2;
            a++;
        }while(score != 1);
        var clr = new Array('00','20','40','60','80','a0','c0','ff');
        self.CubeBack = paper.rect(self.xPos, self.yPos,50,50,15)
        self.CubeBack.attr({
            fill: '#' + clr[((a + 4) * 5) % 8] + clr[a % 8] + clr[((a + 3) * 2) % 8], /* fill with a greenish color */
            stroke: '#000'   /* draw a black border */
        })
    }

    self.changFill = function(a){
        var score = self.ord;
        var a = 0;
        do
        {
            if(score == 0)
            {
                break;
            }
            score /= 2;
            a++;
        }while(score != 1);
        var clr = new Array('00','20','40','60','80','a0','c0','ff');
        self.CubeBack.animate({fill:'#'+clr[((a + 4) * 5) % 8]+clr[a % 8]+clr[((a + 3) *2) % 8]},100,"<>");
    }
    self.init();
}