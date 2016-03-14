/**
 * Created by newsonghe on 2015/6/13 0013.
 */

function Game() {
    if ( !(this instanceof arguments.callee) ) {
        return new arguments.callee(arguments);
    }
    var attrList1 = {fill:"#FF0", stroke: 2,
        "font-size":24,opacity: 1};
    var gameBoard;      //游戏板
    var cardArray;      //方块数组
    var cardArray1;     //方块数组
    var cardArrayr;    //方块数组
    var cardList;      //字体数组
    var cardList1;     //字体数组
    var self = this;
    var BoardPath;      //游戏板路径
    var CubePath;       //方块路径
    var CubeP;          //方块
    var GameOverPath;    //游戏结束图片路径
    var GameOver;        //游戏结束
    var sumscore;        //分数
    self.updateFrame = function()
    {
        self.sumscore = 0;
        self.BoardPath = "images/bubble.png";
        self.gameBoard = paper.image(self.BoardPath,
            0, 0, 1000, 500);
        self.CubePath = "images/Cube.png";
        self.CubeP = paper.image(self.CubePath,
            15, 80, 1500, 750);
        self.gameBoard.toBack();
        self.GameOverPath = "images/GameOver.png";
        var xOffset = 169;
        var yOffset = 245;
        self.init();
    }

    self.init = function() {        //初始化

        self.cardArray = new Array();
        self.cardArray1 = new Array();
        self.cardArrayr = new Array();
        self.cardList = new Array();
        self.cardList1 = new Array();

        for(var i=0; i<25; i++) {
            self.cardArray[i] = new Cube();
            self.cardArray[i].ord = 0;
        }
        for(var i=0; i<25; i++) {
            self.cardArray1[i] = 2;
        }
        for(var i=0; i<5; i++) {
            self.cardArrayr[i] = new Cube();
            self.cardArrayr[i].ord = 0;
        }
        var xOffset = 50;
        var yOffset = 50;

        for(var i = 0;i<5;i++)
        {
            var card = self.cardArrayr[i];
            card.xPos = i * xOffset + 35;
            card.yPos = 0;
        }

        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                var k = (i*5) + j;
                var card = self.cardArray[k];
                card.xPos = j * xOffset + 35;
                card.yPos = i * yOffset + 100;
            }
        }

        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                var k = (i*5) + j;
                var card = self.cardArray1[k];
                card.xPos = j * xOffset + 35;
                card.yPos = i * yOffset + 100;
            }
        }

        for(var i = 0; i<25; i++) {
            self.cardArray[i].drawCard();
            self.cardList[i] = paper.text(self.cardArray[i].xPos+25,self.cardArray[i].yPos+25,self.cardArray[i].ord);
            self.cardList[i].attr(attrList1);
            self.cardList[i].attr({"text":self.cardArray[i].ord});
            if(self.cardArray[i].ord == 0)
            {
                self.cardList[i].attr({opacity: 0});
                self.cardArray[i].CubeBack.attr({opacity: 0});
            }
        }
        for(var i = 0; i<5; i++) {
            self.cardArrayr[i].drawCard();
            self.cardList1[i] =  paper.text(self.cardArrayr[i].xPos+25,self.cardArrayr[i].yPos+25,self.cardArrayr[i].ord);
            self.cardList1[i].attr(attrList1);
            self.cardList1[i].attr({"text":self.cardArrayr[i].ord});
            if(self.cardArrayr[i].ord == 0)
            {
                self.cardList1[i].attr({opacity: 0});
                self.cardArrayr[i].CubeBack.attr({opacity: 0});
            }
        }

        self.randomCard();
        self.checkForMatch();
    }


    self.doKeyDown = function(e) {           //键盘响应后的逻辑运算
        console.log(e);
        var time1 = 0;
        var time2 = 0;
        var cardArray2 = new Array();
        for (var i = 0; i < 25; i++) {
            //self.cardArray1[i] = new Cube();
            cardArray2[i] = 2;
        }
        if (e == 65) {
            self.CubeP.animate({
                transform: "t0,0r-90,160,225s1,1,0,0r0s1"
            }, 1000, "<>",function(){
                self.CubeP.attr({transform: "t0,0r0,160,225s1,1,0,0r0s1"});
            });
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                    self.cardArray1[j + i * 5].ord = self.cardArray[4 - i + j * 5].ord;
                    time1++;
                    self.cardArray[j + i * 5].CubeBack.animate({
                            transform: "t0,0r-90,160,225s1,1,0,0r0s1"
                        }, 1000, "<>", function () {
                            time2++;
                            if (time2 == time1) {
                                console.log("a");
                                for (var a = 0; a < 5; a++) {
                                    for (var b = 0; b < 5; b++) {
                                        cardArray2[b + a * 5] = self.cardArray[4 - a + b * 5].ord;
                                    }
                                }
                                for (var i = 0; i < 25; i++) {
                                    self.cardArray[i].ord = cardArray2[i];
                                }
                                for (var i = 0; i < 25; i++) {
                                    self.cardArray[i].CubeBack.attr({
                                        transform: "t0,0r0,160,225s1,1,0,0r0s1"
                                    });
                                    if (self.cardArray[i].ord == 0) {
                                        self.cardArray[i].CubeBack.attr({
                                            x: self.cardArray[i].xPos,
                                            y: self.cardArray[i].yPos,
                                            opacity: 0
                                        });
                                        self.cardList[i].attr({"text": self.cardArray[i].ord, opacity: 0});
                                    }
                                    else if (self.cardArray[i].ord != 0) {
                                        self.cardArray[i].CubeBack.attr({
                                            x: self.cardArray[i].xPos,
                                            y: self.cardArray[i].yPos,
                                            opacity: 1
                                        });
                                        self.cardArray[i].changFill();
                                        self.cardList[i].attr({"text": self.cardArray[i].ord, opacity: 1});
                                    }
                                }
                                for (var c = 0; c < 5; c++) {
                                    if (self.cardArrayr[c].ord == 0) {
                                        self.cardArrayr[c].CubeBack.attr({
                                            x: self.cardArrayr[c].xPos,
                                            y: self.cardArrayr[c].yPos,
                                            opacity: 0
                                        });
                                    }
                                    else if (self.cardArrayr[c].ord != 0) {
                                        self.cardArrayr[c].CubeBack.attr({
                                            x: self.cardArrayr[c].xPos,
                                            y: self.cardArrayr[c].yPos,
                                            opacity: 1
                                        });
                                        self.cardArrayr[c].changFill();
                                    }
                                }
                                self.checkForMatch();
                            }
                        }
                    );
                    self.cardList[j + i * 5].animate({
                        transform: "t0,0r-90,160,225s1,1,0,0r0s1"
                    }, 1000, "<>", function () {
                        if (time2 == time1) {
                            for (var i = 0; i < 25; i++) {
                                self.cardList[i].attr({transform: "t0,0r0,160,225s1,1,0,0r0s1"});
                            }
                        }
                    });
                }
            }
        }
        if (e == 68) {
            self.CubeP.animate({
                transform: "t0,0r90,160,225s1,1,0,0r0s1"
            }, 1000, "<>",function(){
                self.CubeP.attr({transform: "t0,0r0,160,225s1,1,0,0r0s1"});
            });
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 5; j++) {
                    self.cardArray1[j + i * 5].ord = self.cardArray[i + (4 - j) * 5].ord;
                    time1++;
                    self.cardArray[j + i * 5].CubeBack.animate({
                            transform: "t0,0r90,160,225s1,1,0,0r0s1"
                        }, 1000, "<>", function () {
                            time2++;
                            if (time2 == time1) {
                                console.log("a");
                                for (var a = 0; a < 5; a++) {
                                    for (var b = 0; b < 5; b++) {
                                        cardArray2[b + a * 5] = self.cardArray[a + (4 - b) * 5].ord;
                                    }
                                }
                                for (var i = 0; i < 25; i++) {
                                    self.cardArray[i].ord = cardArray2[i];
                                }
                                for (var i = 0; i < 25; i++) {
                                    self.cardArray[i].CubeBack.attr({
                                        transform: "t0,0r0,160,225s1,1,0,0r0s1"
                                    });
                                    if (self.cardArray[i].ord == 0) {
                                        self.cardArray[i].CubeBack.attr({
                                            x: self.cardArray[i].xPos,
                                            y: self.cardArray[i].yPos,
                                            opacity: 0
                                        });
                                        self.cardList[i].attr({"text": self.cardArray[i].ord, opacity: 0});
                                    }
                                    else if (self.cardArray[i].ord != 0) {
                                        self.cardArray[i].CubeBack.attr({
                                            x: self.cardArray[i].xPos,
                                            y: self.cardArray[i].yPos,
                                            opacity: 1
                                        });
                                        self.cardArray[i].changFill();
                                        self.cardList[i].attr({"text": self.cardArray[i].ord, opacity: 1});
                                    }
                                }
                                for (var c = 0; c < 5; c++) {
                                    if (self.cardArrayr[c].ord == 0) {
                                        self.cardArrayr[c].CubeBack.attr({
                                            x: self.cardArrayr[c].xPos,
                                            y: self.cardArrayr[c].yPos,
                                            opacity: 0
                                        });
                                    }
                                    else if (self.cardArrayr[c].ord != 0) {
                                        self.cardArrayr[c].CubeBack.attr({
                                            x: self.cardArrayr[c].xPos,
                                            y: self.cardArrayr[c].yPos,
                                            opacity: 1
                                        });
                                        self.cardArrayr[c].changFill();
                                    }
                                }
                                self.checkForMatch();
                            }
                        }
                    );
                    self.cardList[j + i * 5].animate({
                        transform: "t0,0r90,160,225s1,1,0,0r0s1"
                    }, 1000, "<>", function () {
                        if (time2 == time1) {
                            for (var i = 0; i < 25; i++) {
                                self.cardList[i].attr({transform: "t0,0r0,160,225s1,1,0,0r0s1"});
                            }
                        }
                    });
                }
            }
        }
    }

    self.checkForMatch = function () {         //匹配方块
        var a = 0;
        var b = 0;
        console.log("checkForMatch");
        for (var j = 0; j < 5; j++) {
            for (var i = 4; i >= 0; i--) {
                for (var n = 0; n <= 4; n++)  //从最底层开始检测泡泡的下落
                {
                    if (i == 0 && self.cardArrayr[n].ord != 0) {
                        if (self.cardArray[n].ord != 0) {
                            if (self.cardArray[n].ord == self.cardArrayr[n].ord) {
                                self.cardArray[n].ord = self.cardArrayr[n].ord * 2;
                                self.sumscore += self.cardArray[n].ord;
                                self.cardArrayr[n].CubeBack.animate({
                                    x: self.cardArray[n].xPos,
                                    y: self.cardArray[n].yPos
                                }, 300, "<>", function () {
                                        b++;
                                        if (b == a) {
                                            for (var c = 0; c < 25; c++) {
                                                if (self.cardArray[c].ord == 0) {
                                                    self.cardArray[c].CubeBack.attr({
                                                        x: self.cardArray[c].xPos,
                                                        y: self.cardArray[c].yPos,
                                                        opacity: 0
                                                    });
                                                    self.cardList[c].attr({"text": self.cardArray[c].ord,
                                                        x: self.cardArray[c].xPos+25,
                                                        y: self.cardArray[c].yPos+25,
                                                        opacity: 0});
                                                }
                                                else if (self.cardArray[c].ord != 0) {
                                                    self.cardArray[c].CubeBack.attr({
                                                        x: self.cardArray[c].xPos,
                                                        y: self.cardArray[c].yPos,
                                                        opacity: 1
                                                    });
                                                    self.cardArray[c].changFill();
                                                    self.cardList[c].attr({"text": self.cardArray[c].ord,
                                                        x: self.cardArray[c].xPos+25,
                                                        y: self.cardArray[c].yPos+25,
                                                        opacity: 1});
                                                }
                                            }
                                            for (var c = 0; c < 5; c++) {
                                                if (self.cardArrayr[c].ord == 0) {
                                                    self.cardArrayr[c].CubeBack.attr({
                                                        x: self.cardArrayr[c].xPos,
                                                        y: self.cardArrayr[c].yPos,
                                                        opacity: 0
                                                    });
                                                    self.cardList1[c].attr({
                                                        "text": self.cardArrayr[c].ord,
                                                        x: self.cardArrayr[c].xPos+25,
                                                        y: self.cardArrayr[c].yPos+25,
                                                        opacity: 0
                                                    });
                                                }
                                                else if (self.cardArrayr[c].ord != 0) {
                                                    self.cardArrayr[c].CubeBack.attr({
                                                        x: self.cardArrayr[c].xPos,
                                                        y: self.cardArrayr[c].yPos,
                                                        opacity: 1
                                                    });
                                                    self.cardArrayr[c].changFill();
                                                    self.cardList1[c].attr({
                                                        "text": self.cardArrayr[c].ord,
                                                        x: self.cardArrayr[c].xPos+25,
                                                        y: self.cardArrayr[c].yPos+25,
                                                        opacity: 1
                                                    });
                                                }
                                            }
                                        }
                                        self.randomCard();
                                    });
                                self.cardList1[n].animate({
                                    x: self.cardArray[n].xPos+25,
                                    y: self.cardArray[n].yPos+25
                                }, 250, "<>");
                                a++;
                                self.cardArrayr[n].ord = 0;
                            }
                        }
                        else {
                            self.cardArray[n].ord = self.cardArrayr[n].ord;
                            self.cardArrayr[n].CubeBack.animate({
                                x: self.cardArray[n].xPos,
                                y: self.cardArray[n].yPos
                            }, 300, "<>", function () {
                                    b++;
                                    if (b == a) {
                                        for (var c = 0; c < 25; c++) {
                                            if (self.cardArray[c].ord == 0) {
                                                self.cardArray[c].CubeBack.animate({
                                                    x: self.cardArray[c].xPos,
                                                    y: self.cardArray[c].yPos,
                                                    opacity: 0
                                                }, 0, "<");
                                                self.cardList[c].attr({"text": self.cardArray[c].ord,
                                                    x: self.cardArray[c].xPos+25,
                                                    y: self.cardArray[c].yPos+25,
                                                    opacity: 0});
                                            }
                                            else if (self.cardArray[c].ord != 0) {
                                                self.cardArray[c].CubeBack.attr({
                                                    x: self.cardArray[c].xPos,
                                                    y: self.cardArray[c].yPos,
                                                    opacity: 1
                                                });
                                                self.cardList[c].attr({"text": self.cardArray[c].ord,
                                                    x: self.cardArray[c].xPos+25,
                                                    y: self.cardArray[c].yPos+25,
                                                    opacity: 1});
                                                self.cardArray[c].changFill();
                                            }
                                        }
                                        for (var c = 0; c < 5; c++) {
                                            if (self.cardArrayr[c].ord == 0) {
                                                self.cardArrayr[c].CubeBack.attr({
                                                    x: self.cardArrayr[c].xPos,
                                                    y: self.cardArrayr[c].yPos,
                                                    opacity: 0
                                                });
                                                self.cardList1[c].attr({"text": self.cardArrayr[c].ord,
                                                    x: self.cardArrayr[c].xPos+25,
                                                    y: self.cardArrayr[c].yPos+25,
                                                    opacity: 0});
                                            }
                                            else if (self.cardArrayr[c].ord != 0) {
                                                self.cardArrayr[c].CubeBack.attr({
                                                    x: self.cardArrayr[c].xPos,
                                                    y: self.cardArrayr[c].yPos,
                                                    opacity: 1
                                                });
                                                self.cardArrayr[c].changFill();
                                                self.cardList1[c].attr({"text": self.cardArrayr[c].ord,
                                                    x: self.cardArrayr[c].xPos+25,
                                                    y: self.cardArrayr[c].yPos+25,
                                                    opacity: 1});
                                            }
                                        }
                                        self.randomCard();
                                    }
                                });
                            self.cardList1[n].animate({
                                x: self.cardArray[n].xPos+25,
                                y: self.cardArray[n].yPos+25
                            }, 250, "<>");
                            a++;
                            self.cardArrayr[n].ord = 0;
                        }
                    }
                    else if (i != 0 && self.cardArray[(i - 1) * 5 + n].ord != 0) {
                        if (self.cardArray[i * 5 + n].ord != 0) {
                            if (self.cardArray[i * 5 + n].ord == self.cardArray[(i - 1) * 5 + n].ord) {
                                self.cardArray[i * 5 + n].ord = self.cardArray[(i - 1) * 5 + n].ord * 2;
                                self.sumscore += self.cardArray[i * 5 + n].ord;
                                self.cardArray[(i - 1) * 5 + n].CubeBack.animate({
                                    x: self.cardArray[i * 5 + n].xPos,
                                    y: self.cardArray[i * 5 + n].yPos
                                }, 300, "<>", function () {
                                        b++;
                                        if (b == a) {
                                            for (var c = 0; c < 25; c++) {
                                                if (self.cardArray[c].ord == 0) {
                                                    self.cardArray[c].CubeBack.attr({
                                                        x: self.cardArray[c].xPos,
                                                        y: self.cardArray[c].yPos,
                                                        opacity: 0
                                                    });
                                                    self.cardList[c].attr({"text": self.cardArray[c].ord,
                                                        x: self.cardArray[c].xPos+25,
                                                        y: self.cardArray[c].yPos+25,
                                                        opacity: 0});
                                                }
                                                else if (self.cardArray[c].ord != 0) {
                                                    self.cardArray[c].CubeBack.attr({
                                                        x: self.cardArray[c].xPos,
                                                        y: self.cardArray[c].yPos,
                                                        opacity: 1
                                                    });
                                                    self.cardList[c].attr({"text": self.cardArray[c].ord,
                                                        x: self.cardArray[c].xPos+25,
                                                        y: self.cardArray[c].yPos+25,
                                                        opacity: 1});
                                                    self.cardArray[c].changFill();
                                                }
                                            }
                                            for (var c = 0; c < 5; c++) {
                                                if (self.cardArrayr[c].ord == 0) {
                                                    self.cardArrayr[c].CubeBack.attr({
                                                        x: self.cardArrayr[c].xPos,
                                                        y: self.cardArrayr[c].yPos,
                                                        opacity: 0
                                                    });
                                                    self.cardList1[c].attr({
                                                        "text": self.cardArrayr[c].ord,
                                                        x: self.cardArrayr[c].xPos+25,
                                                        y: self.cardArrayr[c].yPos+25,
                                                        opacity: 0
                                                    });
                                                }
                                                else if (self.cardArrayr[c].ord != 0) {
                                                    self.cardArrayr[c].CubeBack.attr({
                                                        x: self.cardArrayr[c].xPos,
                                                        y: self.cardArrayr[c].yPos,
                                                        opacity: 1
                                                    });
                                                    self.cardArrayr[c].changFill();
                                                    self.cardList1[c].attr({
                                                        "text": self.cardArrayr[c].ord,
                                                        x: self.cardArrayr[c].xPos+25,
                                                        y: self.cardArrayr[c].yPos+25,
                                                        opacity: 1
                                                    });
                                                }
                                            }
                                            self.randomCard();
                                        }
                                    });
                                self.cardList[(i - 1) * 5 + n].animate({
                                    x: self.cardArray[i * 5 + n].xPos+25,
                                    y: self.cardArray[i * 5 + n].yPos+25
                                }, 250, "<>");
                                a++;
                                self.cardArray[(i - 1) * 5 + n].ord = 0;
                            }
                        }
                        else {
                            self.cardArray[i * 5 + n].ord = self.cardArray[(i - 1) * 5 + n].ord;
                            self.cardArray[(i - 1) * 5 + n].CubeBack.animate({
                                x: self.cardArray[i * 5 + n].xPos,
                                y: self.cardArray[i * 5 + n].yPos
                            }, 300, "<>", function () {
                                    b++;
                                    if (b == a) {
                                        for (var c = 0; c < 25; c++) {
                                            if (self.cardArray[c].ord == 0) {
                                                self.cardArray[c].CubeBack.attr({
                                                    x: self.cardArray[c].xPos,
                                                    y: self.cardArray[c].yPos,
                                                    opacity: 0
                                                });
                                                self.cardList[c].attr({"text": self.cardArray[c].ord,
                                                    x: self.cardArray[c].xPos+25,
                                                    y: self.cardArray[c].yPos+25,
                                                    opacity: 0});
                                            }
                                            else if (self.cardArray[c].ord != 0) {
                                                self.cardArray[c].CubeBack.attr({
                                                    x: self.cardArray[c].xPos,
                                                    y: self.cardArray[c].yPos,
                                                    opacity: 1
                                                });
                                                self.cardList[c].attr({"text": self.cardArray[c].ord,
                                                    x: self.cardArray[c].xPos+25,
                                                    y: self.cardArray[c].yPos+25,
                                                    opacity: 1});
                                                self.cardArray[c].changFill();
                                            }
                                        }
                                        for (var c = 0; c < 5; c++) {
                                            if (self.cardArrayr[c].ord == 0) {
                                                self.cardArrayr[c].CubeBack.attr({
                                                    x: self.cardArrayr[c].xPos,
                                                    y: self.cardArrayr[c].yPos,
                                                    opacity: 0
                                                });
                                                self.cardList1[c].attr({"text": self.cardArrayr[c].ord,
                                                    x: self.cardArrayr[c].xPos+25,
                                                    y: self.cardArrayr[c].yPos+25,
                                                    opacity: 0});
                                            }
                                            else if (self.cardArrayr[c].ord != 0) {
                                                self.cardArrayr[c].CubeBack.attr({
                                                    x: self.cardArrayr[c].xPos,
                                                    y: self.cardArrayr[c].yPos,
                                                    opacity: 1
                                                });
                                                self.cardArrayr[c].changFill();
                                                self.cardList1[c].attr({"text": self.cardArrayr[c].ord,
                                                    x: self.cardArrayr[c].xPos+25,
                                                    y: self.cardArrayr[c].yPos+25,
                                                    opacity: 1});
                                            }
                                        }
                                        self.randomCard();
                                    }
                                });
                            self.cardList[(i - 1) * 5 + n].animate({
                                x: self.cardArray[i * 5 + n].xPos+25,
                                y: self.cardArray[i * 5 + n].yPos+25
                            }, 250, "<>");
                            a++;
                            self.cardArray[(i - 1) * 5 + n].ord = 0;
                        }
                    }
                }
            }
        }
    }
    self.randomCard = function(){        //随机生成方块
        var exist = 0;
        var exist1 = new Array();
        for(var c = 0;c<5;c++)
        {
            if(self.cardArrayr[c].ord == 0)
            {
                exist1[exist] = c;
                exist++;
            }
        }
        if(exist == 0)                //判断游戏结束
        {
            self.GameOver = paper.image(self.GameOverPath,
                10, 80, 750, 750);
            self.GameOver.attr({opacity: 0});
            self.GameOver.animate({opacity: 1},1000,"<>");
            var attrList2 = {fill:"#FF0", stroke: 2,
                "font-size":48,opacity: 1};
            var score = paper.text(125,150,"score:"+self.sumscore);
            console.log(self.sumscore);
            score.attr(attrList2);
        }
        else {
            var ran = Math.floor(Math.random() * exist);
            var ran2 = Math.floor(Math.random() * exist - 1) + 1 + ran;
            if (ran2 >= exist) {
                ran2 -= exist;
            }
            self.cardArrayr[exist1[ran]].ord = 2;
            self.cardArrayr[exist1[ran]].CubeBack.attr({
                opacity: 1
            });
            self.cardArrayr[exist1[ran]].changFill();
            self.cardList1[exist1[ran]].attr({"text":self.cardArrayr[exist1[ran]].ord,opacity: 1});

            self.cardArrayr[exist1[ran2]].ord = 2;
            self.cardArrayr[exist1[ran2]].CubeBack.attr({
                opacity: 1
            });
            self.cardArrayr[exist1[ran2]].changFill();
            self.cardArrayr[exist1[ran2]].changFill();
            self.cardList1[exist1[ran2]].attr({"text":self.cardArrayr[exist1[ran2]].ord,opacity: 1});
        }
    }
    self.updateFrame();
}