(() =>{
    const canvas=document.getElementById('painting');
    canvas.width= window.innerWidth; //set ความพอดีให้กับ window เรา
    canvas.height= window.innerHeight;

    const context = canvas.getContext('2d'); //ถ้ากับเกมให้ 3d จริงๆ canvas ใช้แค่ตั้งค่าขนาดเท่านั้นว่าจะวาดได้ถึงไหน แต่เตัวที่ใช้วาดจริงคือ object context

    let previousPoint = { x: 0, y:0}; //0 0คือตำแหน่งเส้นเริ่มจากขวาบน

    function getDistance(previousPoint, currentPoint){ //สูตรการคำนวนระยะทางของเม้าส์จากจุดก่อนหน้ามาปัจุบัน
        return Math.sqrt((previousPoint.x-currentPoint.x)**2+(previousPoint.y-currentPoint.y)**2);
    }

    function onMouseMove({pageX, pageY}){
        const currentPoint={x:pageX,y: pageY};

        context.beginPath(); //บอก context ว่าเราจะมาเริ่มวาดกัน

        context.lineCap='round'; //เส้นจุดจบของเราหรือปลายเส้นปกติจะเป็นสี่เหลี่ยมแต่เราอยากให้เป็นวงกลม
        context.lineJoin='round'; //เวลาที่เส้นสองเส้นตััดกันปกติมันเป็นสี่เหลี่ยมอยากเปลี่ยนให้เป็นวงกลม
        
        const distance = getDistance(previousPoint, currentPoint); //ฟังก์ชันคำนวนระยะทางความโปร่งแสงที่มันเกิดขึ้น
        context.lineWidth= Math.random()/distance*40; //ความกว้างของเส้นของเรา
    

        const opacity = Math.min(0.5,1/distance); //ความทึบแสง ถ้าเราลากช้าสีจะเข้มมาก เราใช้ Math.min เพื่อบอกว่าถ้าค่าถึง 1 ให้ลงกลับมาที่จุดต่ำสุด ก็คือ 0.5 แล้วก็วนใหม่แบบนี้
        context.strokeStyle=`rgba(222, 10, 109, ${opacity})`; //สีของเส้นที่วาด 0.8=ค่าความโปร่งแสง

        context.moveTo(previousPoint.x,previousPoint.y); //จุดเริ่มต้นของจุดที่เราจะวาด โดยเรากำหนดไปก่อนหน้าคือ 0 0หรือซ้ายบน
        context.lineTo(currentPoint.x, currentPoint.y); //โดยเราจะเริ่มวาดไปที่จุดที่เม้นเราอยู่ปัจจุบัน

        context.stroke(); //บอกให้ระบบเริ่มวาดเส้น
        context.closePath();//บอกว่าวาดแล้วให้จบตรงนี้

        previousPoint= currentPoint; //อัปเดตระบบเพื่อบอกว่าไม่อยากให้เริ่มต้นจากซ้ายบนทุกครั้ง
    }

    function onMouseEnter({pageX, pageY}){
        previousPoint.x=pageX;
        previousPoint.y=pageY;
    }


    function run(){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseenter', onMouseEnter);

    }
 run();
})();