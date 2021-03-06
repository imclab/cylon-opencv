/*
 * Camera driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var namespace = require('node-namespace');

namespace("Cylon.Drivers.OpenCV", function() {
  this.Camera = (function(_parent) {
    subclass(Camera, _parent);

    function Camera(opts) {
      Camera.__super__.constructor.apply(this, arguments);
      this.cameraId = opts.extraParams.camera;
      this.displayingVideo = false;
      this.haarcascade = opts.extraParams.haarcascade;
    }

    Camera.prototype.commands = function() {
      return ['readFrame', 'detectFaces', 'displayVideo'];
    };

    Camera.prototype.start = function() {
      this.defineDriverEvent({
        eventName: 'cameraReady',
        sendUpdate: false
      });
      this.defineDriverEvent({
        eventName: 'frameReady',
        sendUpdate: false
      });
      this.defineDriverEvent({
        eventName: 'facesDetected',
        sendUpdate: false
      });
      this.connection.initCamera(this.cameraId, this.haar);
      Camera.__super__.start.apply(this, arguments);
    };

    Camera.prototype.readFrame = function() {
      this.connection.readFrame(this.cameraId);
    };

    Camera.prototype.detectFaces = function(frame) {
      this.connection.detectFaces(frame, this.haarcascade);
    };

    return Camera;

  })(Cylon.Driver);
});
