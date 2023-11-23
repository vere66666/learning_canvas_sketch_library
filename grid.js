const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = ({width , height }) => {

  //store our info
  const cols = 3;
  const rows = 8;
  const numCells = cols * rows; 

  const gridWidth = 0.5 * width ;
  const gridHeight = 0.8 * height ;

  const cellWidth = gridWidth / cols ;
  const cellHeight = gridHeight / rows ;

  const marginContourX = (width - gridWidth )  /  2;
  const marginContourY =  (height - gridHeight ) / 2;



  const points = [];
  let x, y ;


  for (let i = 0 ; i < numCells ; i++){
    x= (i % cols ) *cellWidth ;
    y= Math.floor(i / cols ) *cellHeight ;
    
    points.push (new Points ({x , y}));
  }



  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(marginContourX, marginContourY);
    context.translate(cellWidth*0.5 , cellHeight*0.5); //c aplik a :p y l
    context.strokeStyle = 'pink';
    context.lineWidth = 2;



    
    //la lineas d
    for (let r = 0; r < rows ; r++ ) {
          context.beginPath(); 

            for (let col = 0 ; col < cols ; col++){ //col = max 1
              const puntoActual = points [(col * r) + col];
              if (!col) context.moveTo(puntoActual.x, puntoActual.y); //c=0
                else context.lineTo(puntoActual.x , puntoActual.y);
            }

          context.stroke();
    }
    


    //los puntos d
    points.forEach(point => {
      point.draw(context);
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
          // context.fillStyle = this.control ? 'black' : 'red';
          context.strokeStyle = 'pink';
          context.lineWidth = 1 ;

          context.beginPath();
          context.arc(0 , 0 /*after translate we r at 0,0*/ ,10 , 0 , Math.PI*2, ); //center point coordinates , radius  , start angle , end angle , direction 
          // context.fill();
          context.stroke();

          context.restore();
        }
}


