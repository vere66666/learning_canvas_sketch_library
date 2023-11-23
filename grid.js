const canvasSketch = require('canvas-sketch');
const random = require ('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = ({width , height }) => {

  //store our info
  const cols = 24;
  const rows = 6;
  const totalCells = cols * rows; 

  const gridWidth = 0.8 * width ;
  const gridHeight = 0.8 * height ;

  const cellWidth = gridWidth / cols ;
  const cellHeight = gridHeight / rows ;

  const marginx = (width - gridWidth )  *0.5;
  const marginy =  (height - gridHeight ) *0.5;



  const puntos = [];

  let x, y , n;
  let frequency = 0.001;
  let amplitude = 90;



  for (let i = 0 ; i < totalCells ; i++){
    x= (i % cols) * cellWidth ;
    y= Math.floor(i / cols) *cellHeight ;
    
    n = random.noise2D(x, y, frequency , amplitude);
    x += n;
    y += n;

    puntos.push (new Points ({x , y}));
  }



  return ({ context, width, height }) => {
    context.fillStyle = 'green';
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(marginx, marginy);
    context.translate(cellWidth*0.5 , cellHeight*0.5); //c aplik a :p y l
    context.strokeStyle = 'pink';
    context.lineWidth = 2;


    
    
    //la lineas d
    for (let row = 0; row < rows ; row++ ) {
          

    for (let col = 0 ; col < cols - 1 ; col++){ //col =/=totalcells // menos -1 porque no utilizaremos el ultimo punto como control point 

              const puntoActual = puntos [row * cols + col]; // cols=/=col ...
              const siguientePunto = puntos [row * cols + col + 1];

              const puntoMediox = puntoActual.x + (siguientePunto.x - puntoActual.x) * 0.5;
              const puntoMedioy = puntoActual.y + (siguientePunto.y - puntoActual.y) * 0.5;

              context.beginPath(); 
               
              // if (!col) context.moveTo(puntoActual.x, puntoActual.y); //c=0
              // else if (col - 2) context.quadraticCurveTo(puntoActual.x, puntoActual.y, siguientePunto.x, siguientePunto.y);
              //   else 
                context.quadraticCurveTo(puntoActual.x , puntoActual.y, puntoMediox , puntoMedioy);
              
              context.stroke();
              } 

    }
    


    //los puntos d
    puntos.forEach(point => {
      // point.draw(context);
    });

    context.restore();

  };
};









canvasSketch(sketch, settings);


class Points {
        constructor ({x, y}) {
          this.x = x;
          this.y = y;
          
        };

        draw (context) {
          context.save();
          context.translate(this.x , this.y );
          context.strokeStyle = 'pink';
          context.lineWidth = 1 ;

          context.beginPath();
          context.arc(0 , 0 ,10 , 0 , Math.PI*2, ); 
          context.stroke();
          context.restore();
        }

        hitTestMethod (x, y) {
          dx = this.x - x;
          dy = this.y - y;

          dd = Math.sqrt(dx*dx - dy*dy);

          return dd<20;
        }
}


