///<reference path="../library/assets/NamedAssetBase.ts" />
///<reference path="../geom/Matrix3D.ts" />
///<reference path="../geom/Vector3D.ts" />
///<reference path="../math/MathConsts.ts" />
///<reference path="../math/Matrix3DUtils.ts" />

module away.base
{
	//import away3d.arcane;
	//import away3d.controllers.*;
	//import away3d.core.math.*;
	//import away3d.events.*;
	//import away3d.library.assets.*;
	
	//import flash.geom.Matrix3D;
	//import flash.geom.Vector3D;
	
	//use namespace arcane;
	
	/**
	 * Dispatched when the position of the 3d object changes.
	 *
	 * @eventType away3d.events.Object3DEvent
	 */
	//[Event(name="positionChanged", type="away3d.events.Object3DEvent")]
	
	/**
	 * Dispatched when the scale of the 3d object changes.
	 *
	 * @eventType away3d.events.Object3DEvent
	 */
	//[Event(name="scaleChanged", type="away3d.events.Object3DEvent")]
	
	/**
	 * Dispatched when the rotation of the 3d object changes.
	 *
	 * @eventType away3d.events.Object3DEvent
	 */
	//[Event(name="rotationChanged", type="away3d.events.Object3DEvent")]
	
	/**
	 * Object3D provides a base class for any 3D object that has a (local) transformation.<br/><br/>
	 *
	 * Standard Transform:
	 * <ul>
	 *     <li> The standard order for transformation is [parent transform] * (Translate+Pivot) * (Rotate) * (-Pivot) * (Scale) * [child transform] </li>
	 *     <li> This is the order of matrix multiplications, left-to-right. </li>
	 *     <li> The order of transformation is right-to-left, however!
	 *          (Scale) happens before (-Pivot) happens before (Rotate) happens before (Translate+Pivot)
	 *          with no pivot, the above transform works out to [parent transform] * Translate * Rotate * Scale * [child transform]
	 *          (Scale) happens before (Rotate) happens before (Translate) </li>
	 *     <li> This is based on code in updateTransform and ObjectContainer3D.updateSceneTransform(). </li>
	 *     <li> Matrix3D prepend = operator on rhs - e.g. transform' = transform * rhs; </li>
	 *     <li> Matrix3D append =  operator on lhr - e.g. transform' = lhs * transform; </li>
	 * </ul>
	 *
	 * To affect Scale:
	 * <ul>
	 *     <li> set scaleX/Y/Z directly, or call scale(delta) </li>
	 * </ul>
	 *
	 * To affect Pivot:
	 * <ul>
	 *     <li> set pivotPoint directly, or call movePivot() </li>
	 * </ul>
	 *
	 * To affect Rotate:
	 * <ul>
	 *    <li> set rotationX/Y/Z individually (using degrees), set eulers [all 3 angles] (using radians), or call rotateTo()</li>
	 *    <li> call pitch()/yaw()/roll()/rotate() to add an additional rotation *before* the current transform.
	 *         rotationX/Y/Z will be reset based on these operations. </li>
	 * </ul>
	 *
	 * To affect Translate (post-rotate translate):
	 *
	 * <ul>
	 *    <li> set x/y/z/position or call moveTo(). </li>
	 *    <li> call translate(), which modifies x/y/z based on a delta vector. </li>
	 *    <li> call moveForward()/moveBackward()/moveLeft()/moveRight()/moveUp()/moveDown()/translateLocal() to add an
	 *         additional translate *before* the current transform. x/y/z will be reset based on these operations. </li>
	 * </ul>
	 */
	
	export class Object3D extends away.library.NamedAssetBase
	{
		/** @private */
        // TODO: implement
		//public _iController:ControllerBase; // Arcane
		
		private _smallestNumber : number = 0.0000000000000000000001;
		private _transformDirty : boolean = true;
		
		private _positionDirty  : boolean;
		private _rotationDirty  : boolean;
		private _scaleDirty     : boolean;
		
		// TODO: not used
		// private var _positionValuesDirty:boolean;
		// private var _rotationValuesDirty:boolean;
		// private var _scaleValuesDirty:boolean;

        /* TODO: implement
		private _positionChanged:Object3DEvent;
		private _rotationChanged:Object3DEvent;
		private _scaleChanged:Object3DEvent;
		*/

		private _rotationX      : number = 0;
		private _rotationY      : number = 0;
		private _rotationZ      : number = 0;
		private _eulers         : away.geom.Vector3D = new away.geom.Vector3D();
		private _flipY          : away.geom.Matrix3D = new away.geom.Matrix3D();


		private _listenToPositionChanged    : boolean;
		private _listenToRotationChanged    : boolean;
		private _listenToScaleChanged       : boolean;
		private _zOffset                    : number = 0;
		
		private invalidatePivot()
		{
			this._pivotZero = (this._pivotPoint.x == 0) && (this._pivotPoint.y == 0) && (this._pivotPoint.z == 0);
			
			this._iInvalidateTransform();
		}
		
		private invalidatePosition()
		{
			if (this._positionDirty)
				return;
			
			this._positionDirty = true;
			
			this._iInvalidateTransform();

            /* TODO: implement
			if (this._listenToPositionChanged)
				this.notifyPositionChanged();
			*/
		}

        /* TODO implement
		private notifyPositionChanged()
		{
			if (!this._positionChanged)
            {


				_positionChanged = new Object3DEvent(Object3DEvent.POSITION_CHANGED, this);

            }
			dispatchEvent(_positionChanged);
		}
		*/

        /* TODO implement
		public addEventListener(type:string, listener, useCapture:boolean = false, priority:number = 0, useWeakReference:boolean = false)
		{
			super.addEventListener(type, listener, useCapture, priority, useWeakReference);
			switch (type) {
				case Object3DEvent.POSITION_CHANGED:
					_listenToPositionChanged = true;
					break;
				case Object3DEvent.ROTATION_CHANGED:
					_listenToRotationChanged = true;
					break;
				case Object3DEvent.SCALE_CHANGED:
					_listenToRotationChanged = true;
					break;
			}
		}
		*/

        /* TODO implement
		public removeEventListener(type:string, listener, useCapture:boolean = false)
		{
			super.removeEventListener(type, listener, useCapture);
			
			if (hasEventListener(type))
				return;
			
			switch (type) {
				case Object3DEvent.POSITION_CHANGED:
					_listenToPositionChanged = false;
					break;
				case Object3DEvent.ROTATION_CHANGED:
					_listenToRotationChanged = false;
					break;
				case Object3DEvent.SCALE_CHANGED:
					_listenToScaleChanged = false;
					break;
			}
		}
		*/


		private invalidateRotation()
		{
			if (this._rotationDirty)
            {

                return;

            }

			this._rotationDirty = true;
			
			this._iInvalidateTransform();

            /* TODO implement
			if (_listenToRotationChanged)
				notifyRotationChanged();
            */
		}


        /* TODO implement
		private notifyRotationChanged()
		{
			if (!_rotationChanged)
				_rotationChanged = new Object3DEvent(Object3DEvent.ROTATION_CHANGED, this);
			
			dispatchEvent(_rotationChanged);
		}
		*/


		private invalidateScale()
		{
			if (this._scaleDirty)
            {

                return;

            }

			this._scaleDirty = true;
			
			this._iInvalidateTransform();

            /* TODO implement
			if (_listenToScaleChanged)
				notifyScaleChanged();
             */
		}


        /* TODO implement
		private notifyScaleChanged()
		{
			if (!_scaleChanged)
				_scaleChanged = new Object3DEvent(Object3DEvent.SCALE_CHANGED, this);
			
			dispatchEvent(_scaleChanged);
		}
		*/

		private _transform  : away.geom.Matrix3D = new away.geom.Matrix3D();
		private _scaleX     : number = 1;
		private _scaleY     : number = 1;
		private _scaleZ     : number = 1;
		private _x          : number = 0;
		private _y          : number = 0;
		private _z          : number = 0;
		private _pivotPoint : away.geom.Vector3D = new away.geom.Vector3D();
		private _pivotZero  : boolean = true;
		private _pos        : away.geom.Vector3D = new away.geom.Vector3D();
		private _rot        : away.geom.Vector3D = new away.geom.Vector3D();
		private _sca        : away.geom.Vector3D = new away.geom.Vector3D();

        //private _transformComponents:Vector.<Vector3D>;
        private _transformComponents : away.geom.Vector3D[];
		
		/**
		 * An object that can contain any extra data.
		 */
		public extra:Object;
		
		/**
		 * Defines the x coordinate of the 3d object relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
		 */
		public get x():number
		{
			return this._x;
		}
		
		public set x(val:number)
		{
			if (this._x == val)
            {

                return;

            }


			this._x = val;
			this.invalidatePosition();

		}
		
		/**
		 * Defines the y coordinate of the 3d object relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
		 */
		public get y():number
		{
			return this._y;
		}
		
		public set y(val:number)
		{
			if (this._y == val)
            {

                return;

            }

			this._y = val;
			this.invalidatePosition();

		}
		
		/**
		 * Defines the z coordinate of the 3d object relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
		 */
		public get z():number
		{
			return this._z;
		}
		
		public set z(val:number)
		{
			if (this._z == val)
            {

                return;

            }

			
			this._z = val;
			this.invalidatePosition();

		}
		
		/**
		 * Defines the euler angle of rotation of the 3d object around the x-axis, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
		 */
		public get rotationX():number
		{
			return this._rotationX*away.math.MathConsts.RADIANS_TO_DEGREES;
		}
		
		public set rotationX(val:number)
		{
			if (this.rotationX == val)
            {

                return;

            }

			
			this._rotationX = val*away.math.MathConsts.DEGREES_TO_RADIANS;
			this.invalidateRotation();
		}
		
		/**
		 * Defines the euler angle of rotation of the 3d object around the y-axis, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
		 */
		public get rotationY():number
		{
			return this._rotationY*away.math.MathConsts.RADIANS_TO_DEGREES;
		}
		
		public set rotationY(val:number)
		{
			if (this.rotationY == val)
            {

                return;

            }

			this._rotationY = val*away.math.MathConsts.DEGREES_TO_RADIANS;
			
			this.invalidateRotation();
		}
		
		/**
		 * Defines the euler angle of rotation of the 3d object around the z-axis, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
		 */
		public get rotationZ():number
		{
			return this._rotationZ*away.math.MathConsts.RADIANS_TO_DEGREES;
		}
		
		public set rotationZ(val:number)
		{
			if (this.rotationZ == val)
            {

                return;

            }

			
			this._rotationZ = val*away.math.MathConsts.DEGREES_TO_RADIANS;
			
			this.invalidateRotation();
		}
		
		/**
		 * Defines the scale of the 3d object along the x-axis, relative to local coordinates.
		 */
		public get scaleX():number
		{
			return this._scaleX;
		}
		
		public set scaleX(val:number)
		{
			if (this._scaleX == val)
            {

                return;

            }

			this._scaleX = val;
			
			this.invalidateScale();
		}
		
		/**
		 * Defines the scale of the 3d object along the y-axis, relative to local coordinates.
		 */
		public get scaleY():number
		{
			return this._scaleY;
		}
		
		public set scaleY(val:number)
		{
			if (this._scaleY == val)
            {

                return;

            }

            this._scaleY = val;

            this.invalidateScale();

		}
		
		/**
		 * Defines the scale of the 3d object along the z-axis, relative to local coordinates.
		 */
		public get scaleZ():number
		{
			return this._scaleZ;
		}
		
		public set scaleZ(val:number)
		{
			if (this._scaleZ == val)
            {

                return;

            }

			this._scaleZ = val;
			this.invalidateScale();

		}
		
		/**
		 * Defines the rotation of the 3d object as a <code>Vector3D</code> object containing euler angles for rotation around x, y and z axis.
		 */
		public get eulers():away.geom.Vector3D
		{
			this._eulers.x = this._rotationX*away.math.MathConsts.RADIANS_TO_DEGREES;
            this._eulers.y = this._rotationY*away.math.MathConsts.RADIANS_TO_DEGREES;
            this._eulers.z = this._rotationZ*away.math.MathConsts.RADIANS_TO_DEGREES;
			
			return this._eulers;
		}
		
		public set eulers(value:away.geom.Vector3D)
		{
			this._rotationX = value.x*away.math.MathConsts.DEGREES_TO_RADIANS;
            this._rotationY = value.y*away.math.MathConsts.DEGREES_TO_RADIANS;
            this._rotationZ = value.z*away.math.MathConsts.DEGREES_TO_RADIANS;

            this.invalidateRotation();
		}
		
		/**
		 * The transformation of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
		 */

		public get transform():away.geom.Matrix3D
		{
			if (this._transformDirty)
            {

                this._pUpdateTransform()

            }

			
			return this._transform;
		}

		public set transform(val:away.geom.Matrix3D)
		{
			//ridiculous matrix error - AS3 Original
            /*
			if (!val.rawData[uint(0)]) {
				var raw:number[] = Matrix3DUtils.RAW_DATA_CONTAINER;
				val.copyRawDataTo(raw);
				raw[uint(0)] = _smallestNumber;
				val.copyRawDataFrom(raw);
			}
			*/

            //ridiculous matrix error
            //*
            if (!val.rawData[0]) {
                var raw:number[] = away.math.Matrix3DUtils.RAW_DATA_CONTAINER;
                val.copyRawDataTo(raw);
                raw[0] = this._smallestNumber;
                val.copyRawDataFrom(raw);
            }
            //*/
			var elements:away.geom.Vector3D[]= val.decompose();
			var vec:away.geom.Vector3D;
			
			vec = elements[0];
			
			if (this._x != vec.x || this._y != vec.y || this._z != vec.z)
            {
                this._x = vec.x;
                this._y = vec.y;
                this._z = vec.z;
				
				this.invalidatePosition();
			}
			
			vec = elements[1];
			
			if (this._rotationX != vec.x || this._rotationY != vec.y || this._rotationZ != vec.z)
            {
                this._rotationX = vec.x;
                this._rotationY = vec.y;
                this._rotationZ = vec.z;

                this.invalidateRotation();
			}
			
			vec = elements[2];
			
			if (this._scaleX != vec.x || this._scaleY != vec.y || this._scaleZ != vec.z) {
                this._scaleX = vec.x;
                this._scaleY = vec.y;
                this._scaleZ = vec.z;

                this.invalidateScale();
			}
		}


		/**
		 * Defines the local point around which the object rotates.
		 */
        /* TODO: implement
		public get pivotPoint():away.geom.Vector3D
		{
			return this._pivotPoint;
		}
		*/
        /* TODO: implement
		public set pivotPoint(pivot:away.geom.Vector3D)
		{
			_pivotPoint = pivot.clone();
			
			invalidatePivot();
		}
		*/
		/**
		 * Defines the position of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
		 */
		public get position():away.geom.Vector3D
		{
			this._transform.copyColumnTo(3, this._pos);
			
			return this._pos.clone();
		}
		
		public set position(value:away.geom.Vector3D)
		{
			this._x = value.x;
            this._y = value.y;
            this._z = value.z;

            this.invalidatePosition();
		}
		
		/**
		 *
		 */
        /* TODO: implement
		public get forwardVector():away.geom.Vector3D
		{
			return away3d.math.Matrix3DUtils.getForward(transform);
		}
		*/
		/**
		 *
		 */
        /* TODO: implement
		public get rightVector():Vector3D
		{
			return away3d.math.Matrix3DUtils.getRight(transform);
		}
		*/
		/**
		 *
		 */
        /*
		public get upVector():away.geom.Vector3D
		{
			return away3d.math.Matrix3DUtils.getUp(transform);
		}
		*/
		/**
		 *
		 */
        /* TODO: implement
		public get backVector():away.geom.Vector3D
		{
			var director:Vector3D = away3d.math.Matrix3DUtils.getForward(transform);
			director.negate();
			
			return director;
		}
		*/
		/**
		 *
		 */
        /* TODO: implement
		public get leftVector():away.geom.Vector3D
		{
			var director:Vector3D = away3d.math.Matrix3DUtils.getRight(transform);
			director.negate();
			
			return director;
		}
		*/
		/**
		 *
		 */
        /* TODO: implement
		public get downVector():away.geom.Vector3D
		{
			var director:Vector3D = away3d.math.Matrix3DUtils.getUp(transform);
			director.negate();
			
			return director;
		}
		*/
		/**
		 * Creates an Object3D object.
		 */
		constructor()
		{

            super();

			// Cached vector of transformation components used when
			// recomposing the transform matrix in updateTransform()


            this._transformComponents = new Array<away.geom.Vector3D>(3);//_transformComponents = new Vector.<Vector3D>(3, true);

			this._transformComponents[0] = this._pos;
            this._transformComponents[1] = this._rot;
            this._transformComponents[2] = this._sca;

            this._transform.identity();

			this._flipY.appendScale(1, -1, 1);
		}
		
		/**
		 * Appends a uniform scale to the current transformation.
		 * @param value The amount by which to scale.
		 */
        /* TODO: implement
		public scale(value:number)
		{
			_scaleX *= value;
			_scaleY *= value;
			_scaleZ *= value;
			
			invalidateScale();
		}
		*/
		/**
		 * Moves the 3d object forwards along it's local z axis
		 *
		 * @param    distance    The length of the movement
		 */
        /* TODO: implement
		public moveForward(distance:number)
		{
			translateLocal(Vector3D.Z_AXIS, distance);
		}
		*/
		/**
		 * Moves the 3d object backwards along it's local z axis
		 *
		 * @param    distance    The length of the movement
		 */
        /* TODO: implement
		public moveBackward(distance:number)
		{
			translateLocal(Vector3D.Z_AXIS, -distance);
		}
		*/
		/**
		 * Moves the 3d object backwards along it's local x axis
		 *
		 * @param    distance    The length of the movement
		 */
        /* TODO: implement
		public moveLeft(distance:number)
		{
			translateLocal(Vector3D.X_AXIS, -distance);
		}
		*/
		/**
		 * Moves the 3d object forwards along it's local x axis
		 *
		 * @param    distance    The length of the movement
		 */
        /* TODO: implement
		public moveRight(distance:number)
		{
			translateLocal(Vector3D.X_AXIS, distance);
		}
		*/
		/**
		 * Moves the 3d object forwards along it's local y axis
		 *
		 * @param    distance    The length of the movement
		 */
        /* TODO: implement
		public moveUp(distance:number)
		{
			translateLocal(Vector3D.Y_AXIS, distance);
		}
		*/
		/**
		 * Moves the 3d object backwards along it's local y axis
		 *
		 * @param    distance    The length of the movement
		 */
        /* TODO: implement
		public moveDown(distance:number)
		{
			translateLocal(Vector3D.Y_AXIS, -distance);
		}
		*/
		/**
		 * Moves the 3d object directly to a point in space
		 *
		 * @param    dx        The amount of movement along the local x axis.
		 * @param    dy        The amount of movement along the local y axis.
		 * @param    dz        The amount of movement along the local z axis.
		 */
        /* TODO: implement
		public moveTo(dx:number, dy:number, dz:number)
		{
			if (_x == dx && _y == dy && _z == dz)
				return;
			_x = dx;
			_y = dy;
			_z = dz;
			
			invalidatePosition();
		}
		*/
		/**
		 * Moves the local point around which the object rotates.
		 *
		 * @param    dx        The amount of movement along the local x axis.
		 * @param    dy        The amount of movement along the local y axis.
		 * @param    dz        The amount of movement along the local z axis.
		 */
        /* TODO: implement
		public movePivot(dx:number, dy:number, dz:number)
		{
			_pivotPoint ||= new Vector3D();
			_pivotPoint.x += dx;
			_pivotPoint.y += dy;
			_pivotPoint.z += dz;
			
			invalidatePivot();
		}
		*/
		/**
		 * Moves the 3d object along a vector by a defined length
		 *
		 * @param    axis        The vector defining the axis of movement
		 * @param    distance    The length of the movement
		 */
        /* TODO: implement
		public translate(axis:Vector3D, distance:number)
		{
			var x:number = axis.x, y:number = axis.y, z:number = axis.z;
			var len:number = distance/Math.sqrt(x*x + y*y + z*z);
			
			_x += x*len;
			_y += y*len;
			_z += z*len;
			
			invalidatePosition();
		}
		*/
		/**
		 * Moves the 3d object along a vector by a defined length
		 *
		 * @param    axis        The vector defining the axis of movement
		 * @param    distance    The length of the movement
		 */
        /* TODO: implement
		public translateLocal(axis:Vector3D, distance:number)
		{
			var x:number = axis.x, y:number = axis.y, z:number = axis.z;
			var len:number = distance/Math.sqrt(x*x + y*y + z*z);
			
			transform.prependTranslation(x*len, y*len, z*len);
			
			_transform.copyColumnTo(3, _pos);
			
			_x = _pos.x;
			_y = _pos.y;
			_z = _pos.z;
			
			invalidatePosition();
		}
		*/
		/**
		 * Rotates the 3d object around it's local x-axis
		 *
		 * @param    angle        The amount of rotation in degrees
		 */
        /* TODO: implement
		public pitch(angle:number)
		{
			rotate(Vector3D.X_AXIS, angle);
		}
		*/
		/**
		 * Rotates the 3d object around it's local y-axis
		 *
		 * @param    angle        The amount of rotation in degrees
		 */
        /* TODO: implement
		public yaw(angle:number)
		{
			rotate(Vector3D.Y_AXIS, angle);
		}
		*/
		/**
		 * Rotates the 3d object around it's local z-axis
		 *
		 * @param    angle        The amount of rotation in degrees
		 */
        /* TODO: implement
		public roll(angle:number)
		{
			rotate(Vector3D.Z_AXIS, angle);
		}
		*/
        /* TODO: implement
		public clone():Object3D
		{
			var clone:Object3D = new Object3D();
			clone.pivotPoint = pivotPoint;
			clone.transform = transform;
			clone.name = name;
			// todo: implement for all subtypes
			return clone;
		}
		*/
		/**
		 * Rotates the 3d object directly to a euler angle
		 *
		 * @param    ax        The angle in degrees of the rotation around the x axis.
		 * @param    ay        The angle in degrees of the rotation around the y axis.
		 * @param    az        The angle in degrees of the rotation around the z axis.
		 */
        /* TODO: implement
		public rotateTo(ax:number, ay:number, az:number)
		{
			_rotationX = ax*MathConsts.DEGREES_TO_RADIANS;
			_rotationY = ay*MathConsts.DEGREES_TO_RADIANS;
			_rotationZ = az*MathConsts.DEGREES_TO_RADIANS;
			
			invalidateRotation();
		}
		*/
		/**
		 * Rotates the 3d object around an axis by a defined angle
		 *
		 * @param    axis        The vector defining the axis of rotation
		 * @param    angle        The amount of rotation in degrees
		 */
        /* TODO: implement
		public rotate(axis:Vector3D, angle:number)
		{
			transform.prependRotation(angle, axis);
			
			transform = transform;
		}
		*/
		/**
		 * Rotates the 3d object around to face a point defined relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
		 *
		 * @param    target        The vector defining the point to be looked at
		 * @param    upAxis        An optional vector used to define the desired up orientation of the 3d object after rotation has occurred
		 */
        /* TODO: implement
		public lookAt(target:Vector3D, upAxis:Vector3D = null)
		{
			var yAxis:Vector3D, zAxis:Vector3D, xAxis:Vector3D;
			var raw:number[];
			
			upAxis ||= Vector3D.Y_AXIS;
			
			zAxis = target.subtract(position);
			zAxis.normalize();
			
			xAxis = upAxis.crossProduct(zAxis);
			xAxis.normalize();
			
			if (xAxis.length < .05)
				xAxis = upAxis.crossProduct(Vector3D.Z_AXIS);
			
			yAxis = zAxis.crossProduct(xAxis);
			
			raw = away3d.math.Matrix3DUtils.RAW_DATA_CONTAINER;
			
			raw[uint(0)] = _scaleX*xAxis.x;
			raw[uint(1)] = _scaleX*xAxis.y;
			raw[uint(2)] = _scaleX*xAxis.z;
			raw[uint(3)] = 0;
			
			raw[uint(4)] = _scaleY*yAxis.x;
			raw[uint(5)] = _scaleY*yAxis.y;
			raw[uint(6)] = _scaleY*yAxis.z;
			raw[uint(7)] = 0;
			
			raw[uint(8)] = _scaleZ*zAxis.x;
			raw[uint(9)] = _scaleZ*zAxis.y;
			raw[uint(10)] = _scaleZ*zAxis.z;
			raw[uint(11)] = 0;
			
			raw[uint(12)] = _x;
			raw[uint(13)] = _y;
			raw[uint(14)] = _z;
			raw[uint(15)] = 1;
			
			_transform.copyRawDataFrom(raw);
			
			transform = transform;
			
			if (zAxis.z < 0) {
				rotationY = (180 - rotationY);
				rotationX -= 180;
				rotationZ -= 180;
			}
		}
		*/
		/**
		 * Cleans up any resources used by the current object.
		 */
        /* TODO: implement
		public dispose()
		{
		}
		*/
		/**
		 * @inheritDoc
		 */
        /* TODO: implement
		public disposeAsset()
		{
			dispose();
		}
		*/
		/**
		 * Invalidates the transformation matrix, causing it to be updated upon the next request
		 */

		public _iInvalidateTransform()
		{
			this._transformDirty = true;
		}


		public _pUpdateTransform()
		{
			this._pos.x = this._x;
            this._pos.y = this._y;
            this._pos.z = this._z;

            this._rot.x = this._rotationX;
            this._rot.y = this._rotationY;
            this._rot.z = this._rotationZ;

            this._sca.x = this._scaleX;
            this._sca.y = this._scaleY;
            this._sca.z = this._scaleZ;

            this._transform.recompose(this._transformComponents);
			
			if (!this._pivotZero) {
                this._transform.prependTranslation(-this._pivotPoint.x, -this._pivotPoint.y, -this._pivotPoint.z);
                this._transform.appendTranslation(this._pivotPoint.x, this._pivotPoint.y, this._pivotPoint.z);
			}

            this._transformDirty = false;
            this._positionDirty = false;
            this._rotationDirty = false;
            this._scaleDirty = false;
		}

		public get zOffset():number
		{
			return this._zOffset;
		}
		
		public set zOffset(value:number)
		{
			this._zOffset = value;
		}
	}
}