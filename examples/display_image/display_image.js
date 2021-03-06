var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'opencv', adaptor: 'opencv' },
  devices: [
    { name: 'window', driver: 'window' },
    { name: 'camera', driver: 'camera', camera: 0 }
  ],

  work: function(my) {
    my.camera.on('cameraReady', function() {
      console.log('THE CAMERA IS READY!');

      my.camera.on('frameReady', function(err, im) {
        my.window.show(im, 5000);
      });

      my.camera.readFrame();
    });
  }
}).start();
