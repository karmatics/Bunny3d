class Simple3dShapes {
  constructor() {}

  static buildPrimitives(app, scene) {
      if (typeof Simple3dShapes !== 'undefined' && Simple3dShapes.buildPrimitives) {
        return Simple3dShapes.buildPrimitives(app, scene);
      }
    }
}

globalThis.Simple3dShapes = Simple3dShapes;
if (typeof module !== 'undefined' && module.exports) module.exports = Simple3dShapes;