
export default {draw}

function draw(camera)
{
    if(!camera) return;
    camera.context.save();
    camera.context.beginPath();
    camera.context.fillStyle = '#309f31';
    camera.context.fillRect(0, 0, camera.width, camera.height);
    camera.context.closePath();
    camera.context.restore();
}
