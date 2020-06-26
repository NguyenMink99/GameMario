var imgPlayer = new Image();
imgPlayer.src = "./img/mario.png";
var imgTreasure = new Image();
imgTreasure.src = "./img/treasure.png";
var imgTrap = new Image();
imgTrap.src = "./img/monster.jpg";

var user = {
  img: imgPlayer,
  posX: 0,
  posY: 0,
  Width: 50,
  Height: 50,
  countTreasure: 0,
  // cac phuong thuc cua User co gia tri la function
  draw: function (ctx) {
    //hien thi img voi vi tri X,Y dong bo voi matrix [0-9
    ctx.drawImage(
      this.img,
      this.posX * 50,
      this.posY * 50,
      this.Width,
      this.Height
    );
  },
  moveLeft: function () {
    if (this.posX > 0) {// khi posX > 0 moi duoc sang trai
      this.posX -= 1;
    }
    Check();// Moi khi di chuyen se kiem tra xem co phai la Treasure ko ?
  },
  moveRight: function () {
    if (this.posX < 9) {// khi posY < 9 moi duoc sang phai
      this.posX += 1;
    }
    Check();
  },
  moveUp: function () {
    if (this.posY > 0) {
      this.posY -= 1;
    }
    Check();
  },
  moveDown: function () {
    if (this.posY < 9) {
      this.posY += 1;
    }
    Check();
  },
  userCollecting: function () {// function nay dung de cong len ma thoi
    this.countTreasure++;
  },
  Win: function () { // Thong bao You Win
    alert("you Win");
    location.reload();
  },
};

document.addEventListener("keydown", (event) => {
  //bat su kien keydown
  // console.log("Keydown event: ",event);
  switch (
    event.keyCode //lay keyCode cua event de chon phim
  ) {
    case 37:
      user.moveLeft();
      //console.log("Key arrow left");
      break;
    case 38:
      user.moveUp();
     // console.log("Key arrow up");
      break;
    case 39:
      user.moveRight();
     // console.log("Key arrow right");
      break;
    case 40:
      user.moveDown();
     // console.log("Key arrow down");
      break;
  }
});

// 1: treasure , -1 : trap
var matrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
  [0, 0, -1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, -1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// /*
// var number = matrix.reduce((result, matrixX)=>{
//     return  resulX + matrixX.reduce((resultX,value) => {
//         if(value == 1)
//             { resulX += 1; }
//             return value === 1 ? resulX + 1 : resulX
//     },0)
// },0)
// */

// count number of treasure
var numberOfTreasure = 0;
for (let j = 0; j < matrix.length; j++) // Loop array
{
  for (let i = 0; i < matrix[j].length; i++) // Loop value of array
  {
    if (matrix[j][i] === 1) {
      numberOfTreasure++;
    }
  }
}

 function Check()
 {
     for(let j=0; j< matrix.length;j++)// Loop array
     {
         for(let i=0;i< matrix[j].length;i++)// Loop value of array
         {
             if(matrix[j][i] === 1 && user.posX == i && user.posY == j)
             {
                // console.log(i,j,user.posX,user.posY)
                 user.userCollecting();// goi ham de countTreasure tang len
                 matrix[j][i]=0;// set lai gia tri de xoa imgTreasure
             }
             if(matrix[j][i] === -1 && user.posX == i && user.posY == j)
             {
                alert("You Die");
                location.reload();
             }
         }
     }
     if(user.countTreasure == numberOfTreasure)
             {
                 user.Win();
             }
            
 }

function draw(ctx) {
  for (let j = 0; j < matrix.length; j++)    // Loop array
   {
    for (let i = 0; i < matrix[j].length; i++) // Loop value of array
     {
      if (matrix[j][i] === 1) {
        ctx.drawImage(imgTreasure, i * 50, j * 50, user.Width, user.Height);
      } else if (matrix[j][i] === -1) {
        ctx.drawImage(imgTrap, i * 50, j * 50, user.Width, user.Height);
      }
    }
  }
}

window.onload = () => {
  //su dung onload khi duyet xong img moi hien thi ra
  setInterval(() => {
    //dung de lap hinh anh trong 1 tik tak
    var c = document.getElementById("treasure"); //lay the HTML
    var ctx = c.getContext("2d"); //chon ve 2d
    ctx.fillStyle = "#c6812b"; //chon background
    ctx.fillRect(0, 0, 500, 500); //ve hinh chu nhat tren ptu canvas
    user.draw(ctx); //hien thi Player thong qua phuong thuc draw cua User
    draw(ctx); //ham draw de hien thi treasure va trap
  }, 1);
};
