/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "b8e8914d1bb9d3d642ba";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(13)(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("shelljs");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("del");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("x-js-kit");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("caller-path");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("cfonts");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("as-table");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("update-notifier");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("ansicolor");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("ololog");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(0);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);

// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(1);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);

// EXTERNAL MODULE: external "commander"
var external_commander_ = __webpack_require__(3);
var external_commander_default = /*#__PURE__*/__webpack_require__.n(external_commander_);

// EXTERNAL MODULE: external "events"
var external_events_ = __webpack_require__(6);

// EXTERNAL MODULE: external "caller-path"
var external_caller_path_ = __webpack_require__(7);
var external_caller_path_default = /*#__PURE__*/__webpack_require__.n(external_caller_path_);

// EXTERNAL MODULE: external "cfonts"
var external_cfonts_ = __webpack_require__(8);
var external_cfonts_default = /*#__PURE__*/__webpack_require__.n(external_cfonts_);

// EXTERNAL MODULE: external "as-table"
var external_as_table_ = __webpack_require__(9);
var external_as_table_default = /*#__PURE__*/__webpack_require__.n(external_as_table_);

// EXTERNAL MODULE: external "x-js-kit"
var external_x_js_kit_ = __webpack_require__(5);
var external_x_js_kit_default = /*#__PURE__*/__webpack_require__.n(external_x_js_kit_);

// EXTERNAL MODULE: external "update-notifier"
var external_update_notifier_ = __webpack_require__(10);
var external_update_notifier_default = /*#__PURE__*/__webpack_require__.n(external_update_notifier_);

// EXTERNAL MODULE: external "shelljs"
var external_shelljs_ = __webpack_require__(2);
var external_shelljs_default = /*#__PURE__*/__webpack_require__.n(external_shelljs_);

// CONCATENATED MODULE: ./src/type.ts
/* eslint-disable no-use-before-define */

/* eslint-disable camelcase */

/**
 * 主程序事件名称枚举
 */
var CheckerEventNameEnum;
/**
 * 错误类型枚举
 */

(function (CheckerEventNameEnum) {
  CheckerEventNameEnum["START"] = "START";
  CheckerEventNameEnum["ITEM_START"] = "ITEM_START";
  CheckerEventNameEnum["END"] = "END";
  CheckerEventNameEnum["RESULT"] = "RESULT";
  CheckerEventNameEnum["ITEM_END"] = "ITEM_END";
})(CheckerEventNameEnum || (CheckerEventNameEnum = {}));

var CheckerMessageTypeEnum;
/**
 * 插件类型
 */

(function (CheckerMessageTypeEnum) {
  CheckerMessageTypeEnum["INFO"] = "INFO";
  CheckerMessageTypeEnum["ERROR"] = "ERROR";
  CheckerMessageTypeEnum["WARN"] = "WARN";
})(CheckerMessageTypeEnum || (CheckerMessageTypeEnum = {}));
// CONCATENATED MODULE: ./src/log.ts
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
__webpack_require__(11).nice;

var log = __webpack_require__(12).configure({
  tag: true,
  locate: false
});

function redStyle(str) {
  return str.dim.red;
}
function greenStyle(str) {
  return str.dim.green;
}
function info() {
  log.info.apply(log, arguments);
}
function warn() {
  log.warn.apply(log, arguments);
}
function error() {
  log.error.apply(log, arguments);
}
// CONCATENATED MODULE: ./src/plugins/package-version/index.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var package_version_Plugin = /*#__PURE__*/function () {
  function Plugin() {
    _classCallCheck(this, Plugin);

    _defineProperty(this, "name", "x-package-version-strict-check");

    _defineProperty(this, "aliasName", "Package Version Checker");

    _defineProperty(this, "result", {
      title: this.aliasName,
      msgCount: 0,
      msgType: CheckerMessageTypeEnum.INFO
    });
  }

  _createClass(Plugin, [{
    key: "run",
    value: function run() {
      var cmd = "x-package-version-strict-check";
      info("Executing command: ", cmd);
      var outStr = external_shelljs_default.a.exec(cmd, {
        silent: false
      }).stdout;

      if (!outStr.includes("everything is ok")) {
        this.result.msgType = CheckerMessageTypeEnum.ERROR;
        this.result.msgCount = 1;
      }

      if (this.isSuccess) {
        info("OK!");
      }
    }
  }, {
    key: "isSuccess",
    get: function get() {
      return this.result.msgType != CheckerMessageTypeEnum.ERROR;
    }
  }]);

  return Plugin;
}();

var PackageVersionPlugin = new package_version_Plugin();
// EXTERNAL MODULE: external "del"
var external_del_ = __webpack_require__(4);
var external_del_default = /*#__PURE__*/__webpack_require__.n(external_del_);

// CONCATENATED MODULE: ./src/plugins/eslint/index.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { eslint_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function eslint_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function eslint_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function eslint_createClass(Constructor, protoProps, staticProps) { if (protoProps) eslint_defineProperties(Constructor.prototype, protoProps); if (staticProps) eslint_defineProperties(Constructor, staticProps); return Constructor; }

function eslint_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var eslint_Plugin = /*#__PURE__*/function () {
  function Plugin() {
    eslint_classCallCheck(this, Plugin);

    eslint_defineProperty(this, "name", "eslint");

    eslint_defineProperty(this, "aliasName", "Code Standard Checker");

    eslint_defineProperty(this, "result", {
      title: this.aliasName,
      msgCount: 0,
      msgType: CheckerMessageTypeEnum.INFO
    });
  }

  eslint_createClass(Plugin, [{
    key: "run",
    value: function run(options) {
      //删除项目中已有的eslint配置文件
      external_del_default.a.sync(external_path_default.a.resolve(options.commandArgs.codePath, ".eslintrc.js"));
      external_del_default.a.sync(external_path_default.a.resolve(options.commandArgs.codePath, ".eslintrc.json"));
      external_del_default.a.sync(external_path_default.a.resolve(options.commandArgs.codePath, ".eslintrc.yaml"));
      external_del_default.a.sync(external_path_default.a.resolve(options.commandArgs.codePath, ".eslintrc.yml"));
      external_del_default.a.sync(external_path_default.a.resolve(options.commandArgs.codePath, ".eslintrc"));
      external_del_default.a.sync(external_path_default.a.resolve(options.commandArgs.codePath, ".eslintignore"));
      info("Clear project's config file about ESLint!"); //替换 eslint-plugin-react-hooks 源码

      info("Replace [eslint-plugin-react-hooks] source to ignore [be called conditionally] of hooks tips...");
      var copyCmd = "cpy ".concat(external_path_default.a.resolve(options.commandArgs.packagePath, "dist/npm-source/eslint-plugin-react-hooks/cjs/*"), " ").concat(external_path_default.a.resolve(options.commandArgs.codePath, "node_modules/eslint-plugin-react-hooks/cjs/"));
      info("Executing command: ", copyCmd);
      external_shelljs_default.a.exec(copyCmd); //添加新的配置文件

      var projectConfigPath = external_path_default.a.resolve(options.commandArgs.codePath, ".eslintrc.json");
      var projectIgnoreConfigPath = external_path_default.a.resolve(options.commandArgs.codePath, ".eslintignore");
      external_fs_default.a.writeFileSync(projectConfigPath, "");
      external_fs_default.a.writeFileSync(projectIgnoreConfigPath, ""); //默认的eslint配置文件

      var configPath = external_path_default.a.resolve(options.commandArgs.packagePath, "dist/config/.eslintrc.json");
      var ignoreConfigPath = external_path_default.a.resolve(options.commandArgs.packagePath, "dist/config/.eslintignore");
      var configObject = JSON.parse(external_fs_default.a.readFileSync(configPath).toString());
      var ignoreConfig = external_fs_default.a.readFileSync(ignoreConfigPath).toString() + "\n"; //生成配置文件（eslintignore）

      var ignorePathSet = new Set();

      if (options.commandArgs.checkDir) {
        ignorePathSet.add("/*"); //先要排除所有

        options.commandArgs.checkDir.split(",").forEach(function (x) {
          ignorePathSet.add("!/".concat(x)); //基于上面排除的范围内，再剔除
        });
      }

      if (options.commandArgs.ignoreCheckDir) {
        options.commandArgs.ignoreCheckDir.split(",").forEach(function (x) {
          ignorePathSet.add(x);
        });
      }

      var ignoreConfigStr = ignoreConfig + _toConsumableArray(ignorePathSet).map(function (x) {
        return "".concat(x, "\n");
      }).join("");

      external_fs_default.a.writeFileSync(projectIgnoreConfigPath, ignoreConfigStr);
      info("Updated file: ", projectIgnoreConfigPath, ignoreConfigStr); //生成配置文件（eslintrc.json）

      var eslintConfig = _objectSpread({}, configObject);

      if (options.commandArgs.eslint_global) {
        options.commandArgs.eslint_global.split(",").forEach(function (k) {
          eslintConfig.globals[k] = false;
        });
      }

      eslintConfig.parserOptions.tsconfigRootDir = options.commandArgs.codePath;

      if (options.commandArgs.isDebug) {
        info(eslintConfig);
      }

      var eslintConfigStr = JSON.stringify(eslintConfig, null, 2);
      external_fs_default.a.writeFileSync(projectConfigPath, eslintConfigStr);
      info("Updated file: ", projectConfigPath); //开始运行检查

      var checkCmd = "eslint ".concat(options.commandArgs.codePath, " --ext .js,.jsx,.ts,.tsx --max-warnings 0 ");
      info("Executing command: ", checkCmd);
      var execResult = external_shelljs_default.a.exec(checkCmd, {
        silent: false
      });
      var outStr = execResult.stdout;

      if (execResult.code != 0) {
        this.result.msgType = CheckerMessageTypeEnum.ERROR;
        error("Run eslint error, exit code :", execResult.code);
      }

      if (outStr) {
        this.result.msgType = CheckerMessageTypeEnum.ERROR;
        this.result.msgCount = 1;
        var matchList = /(\d+)\s+problems/.exec(outStr);

        if (matchList && matchList.length && matchList[1]) {
          this.result.msgCount = external_x_js_kit_default.a.common.convert.toInt(matchList[1]);
        }

        return;
      }

      if (this.isSuccess) {
        info("OK!");
      }
    }
  }, {
    key: "isSuccess",
    get: function get() {
      return this.result.msgType != CheckerMessageTypeEnum.ERROR;
    }
  }]);

  return Plugin;
}();

var EslintPlugin = new eslint_Plugin();
// CONCATENATED MODULE: ./src/plugins/prettier/index.ts
function prettier_toConsumableArray(arr) { return prettier_arrayWithoutHoles(arr) || prettier_iterableToArray(arr) || prettier_unsupportedIterableToArray(arr) || prettier_nonIterableSpread(); }

function prettier_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function prettier_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return prettier_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return prettier_arrayLikeToArray(o, minLen); }

function prettier_iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function prettier_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return prettier_arrayLikeToArray(arr); }

function prettier_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function prettier_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function prettier_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function prettier_createClass(Constructor, protoProps, staticProps) { if (protoProps) prettier_defineProperties(Constructor.prototype, protoProps); if (staticProps) prettier_defineProperties(Constructor, staticProps); return Constructor; }

function prettier_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var prettier_Plugin = /*#__PURE__*/function () {
  function Plugin() {
    prettier_classCallCheck(this, Plugin);

    prettier_defineProperty(this, "name", "prettier");

    prettier_defineProperty(this, "aliasName", "Code Format Checker");

    prettier_defineProperty(this, "result", {
      title: this.aliasName,
      msgCount: 0,
      msgType: CheckerMessageTypeEnum.INFO
    });
  }

  prettier_createClass(Plugin, [{
    key: "run",
    value: function run(options) {
      //项目中已有的配置文件
      var projectConfigPath = external_path_default.a.resolve(options.commandArgs.codePath, ".prettierrc.json");
      var projectIgnoreConfigPath = external_path_default.a.resolve(options.commandArgs.codePath, ".prettierignore"); //清空项目中的已有配置文件

      info("Clear project's config file about Prettier!");
      external_fs_default.a.writeFileSync(projectConfigPath, "");
      external_fs_default.a.writeFileSync(projectIgnoreConfigPath, ""); //默认配置

      var configPath = external_path_default.a.resolve(options.commandArgs.packagePath, "dist/config/.prettierrc.json");
      var ignoreConfigPath = external_path_default.a.resolve(options.commandArgs.packagePath, "dist/config/.prettierignore");
      var configObject = JSON.parse(external_fs_default.a.readFileSync(configPath).toString());
      var ignoreConfig = external_fs_default.a.readFileSync(ignoreConfigPath).toString() + "\n"; //组装cmd脚本命令

      var ignorePathSet = new Set();

      if (options.commandArgs.checkDir) {
        ignorePathSet.add("/*"); //先要排除所有

        options.commandArgs.checkDir.split(",").forEach(function (x) {
          ignorePathSet.add("!/".concat(x)); //基于上面排除的范围内，再剔除
        });
      }

      if (options.commandArgs.ignoreCheckDir) {
        options.commandArgs.ignoreCheckDir.split(",").forEach(function (x) {
          ignorePathSet.add(x);
        });
      } //生成配置文件（prettierignore）


      var ignoreConfigStr = ignoreConfig + prettier_toConsumableArray(ignorePathSet).map(function (x) {
        return "".concat(x, "\n");
      }).join("");

      external_fs_default.a.writeFileSync(projectIgnoreConfigPath, ignoreConfigStr);
      info("Updated file: ", projectIgnoreConfigPath, ignoreConfigStr); //生成配置文件（prettierrc）

      external_fs_default.a.writeFileSync(projectConfigPath, JSON.stringify(configObject, null, 2));
      info("Updated file: ", projectConfigPath, configObject); //开始运行检查

      var cmd = "prettier --check ".concat(external_path_default.a.join(options.commandArgs.codePath, "/**/*"), " --no-editorconfig");
      info("Executing command: ", cmd);
      var execResult = external_shelljs_default.a.exec(cmd, {
        silent: false
      });

      if (execResult.code != 0) {
        var matchList = /^/gm.exec(execResult.stdout) || [];
        this.result.msgType = CheckerMessageTypeEnum.WARN;
        this.result.msgCount = matchList.length; //不准确，目前都为1
      }

      if (this.isSuccess) {
        info("OK!");
      }
    }
  }, {
    key: "isSuccess",
    get: function get() {
      return this.result.msgType != CheckerMessageTypeEnum.ERROR;
    }
  }]);

  return Plugin;
}();

var PrettierPlugin = new prettier_Plugin();
// CONCATENATED MODULE: ./src/plugins/project-basic/index.ts
function project_basic_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function project_basic_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function project_basic_createClass(Constructor, protoProps, staticProps) { if (protoProps) project_basic_defineProperties(Constructor.prototype, protoProps); if (staticProps) project_basic_defineProperties(Constructor, staticProps); return Constructor; }

function project_basic_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var project_basic_Plugin = /*#__PURE__*/function () {
  function Plugin() {
    project_basic_classCallCheck(this, Plugin);

    project_basic_defineProperty(this, "name", "project-basic");

    project_basic_defineProperty(this, "aliasName", "Basic Information Checker");

    project_basic_defineProperty(this, "result", {
      title: this.aliasName,
      msgCount: 0,
      msgType: CheckerMessageTypeEnum.INFO
    });
  }

  project_basic_createClass(Plugin, [{
    key: "run",
    value: function run(options) {
      //检查package.json文件（必须包含script.start,script.dist）
      var packageJsonPath = external_path_default.a.resolve(options.commandArgs.codePath, "package.json");

      if (external_fs_default.a.existsSync(packageJsonPath)) {
        var packageJson = JSON.parse(external_fs_default.a.readFileSync(packageJsonPath).toString());

        if (!packageJson.scripts) {
          packageJson.scripts = {};
        }

        if (!packageJson.scripts.start || !packageJson.scripts.dist) {
          this.result.msgCount = 1;
          this.result.msgType = CheckerMessageTypeEnum.WARN;
          warn("File package.json must include: script.start,script.dist!");
        }
      } //检查目录结构（必须包含src,dist,doc）


      if (!external_fs_default.a.existsSync(external_path_default.a.resolve(options.commandArgs.codePath, "src"))) {
        this.result.msgCount++;
        this.result.msgType = CheckerMessageTypeEnum.WARN;
        warn("The project must contains directory: src !");
      }

      if (!external_fs_default.a.existsSync(external_path_default.a.resolve(options.commandArgs.codePath, "dist"))) {
        this.result.msgCount++;
        this.result.msgType = CheckerMessageTypeEnum.WARN;
        warn("The project must contains directory: dist !");
      }

      if (!external_fs_default.a.existsSync(external_path_default.a.resolve(options.commandArgs.codePath, "doc"))) {
        this.result.msgCount++;
        this.result.msgType = CheckerMessageTypeEnum.WARN;
        warn("The project must contains directory: doc !");
      }

      if (this.isSuccess) {
        info("OK!");
      }
    }
  }, {
    key: "isSuccess",
    get: function get() {
      return this.result.msgType != CheckerMessageTypeEnum.ERROR;
    }
  }]);

  return Plugin;
}();

var ProjectBasicPlugin = new project_basic_Plugin();
// CONCATENATED MODULE: ./src/plugins/type-check/index.ts
function type_check_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function type_check_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function type_check_createClass(Constructor, protoProps, staticProps) { if (protoProps) type_check_defineProperties(Constructor.prototype, protoProps); if (staticProps) type_check_defineProperties(Constructor, staticProps); return Constructor; }

function type_check_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var type_check_Plugin = /*#__PURE__*/function () {
  function Plugin() {
    type_check_classCallCheck(this, Plugin);

    type_check_defineProperty(this, "name", "type-check");

    type_check_defineProperty(this, "aliasName", "TypeScript Type Check");

    type_check_defineProperty(this, "result", {
      title: this.aliasName,
      msgCount: 0,
      msgType: CheckerMessageTypeEnum.INFO
    });
  }

  type_check_createClass(Plugin, [{
    key: "run",
    value: function run() {
      //开始运行检查
      var cmd = "tsc --noEmit";
      info("Executing command: ", cmd);
      var execResult = external_shelljs_default.a.exec(cmd, {
        silent: false
      });

      if (execResult.code != 0) {
        this.result.msgType = CheckerMessageTypeEnum.ERROR;
        this.result.msgCount = 1;
        error("Run type-check error, exit code :", execResult.code);
      }

      if (this.isSuccess) {
        info("OK!");
      }
    }
  }, {
    key: "isSuccess",
    get: function get() {
      return this.result.msgType != CheckerMessageTypeEnum.ERROR;
    }
  }]);

  return Plugin;
}();

var TypeCheckPlugin = new type_check_Plugin();
// CONCATENATED MODULE: ./src/plugins/index.ts





var plugins = [ProjectBasicPlugin, PackageVersionPlugin, EslintPlugin, PrettierPlugin, TypeCheckPlugin];
// CONCATENATED MODULE: ./src/index.ts
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = src_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function src_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return src_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return src_arrayLikeToArray(o, minLen); }

function src_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function src_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function src_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function src_createClass(Constructor, protoProps, staticProps) { if (protoProps) src_defineProperties(Constructor.prototype, protoProps); if (staticProps) src_defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function src_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













var commandArgs = {};
commandArgs.execFileRootPath = external_caller_path_default()();
commandArgs.packagePath = external_path_default.a.resolve(commandArgs.execFileRootPath, "../../"); //package.json

var src_packageJson = JSON.parse(external_fs_default.a.readFileSync(external_path_default.a.resolve(commandArgs.packagePath, "package.json")).toString()); //初始化环境变量

process.env.PATH = external_path_default.a.resolve(commandArgs.packagePath, "node_modules/.bin") + external_path_default.a.delimiter + process.env.PATH; //命令

external_commander_default.a.version(src_packageJson.version);
external_commander_default.a.option("--debug", "Run as debug.", false).option("--path <type>", "Project's path that you want to check.", "./").option("--check-dir <type>", "Specify a directory to be scanned by code (e.g. by plug-ins such as eslint), the default is root value of --path. (multiple are separated by ,).", "").option("--ignore-check-dir <type>", "Specify a directory to be no scanned by code (e.g. by plug-ins such as eslint), (multiple are separated by ,).", "").option("--eslint-global <type>", "Define global variate, see eslint doc.", "").parse(process.argv);
commandArgs.isDebug = external_commander_default.a.debug;
commandArgs.codePath = external_path_default.a.resolve(external_commander_default.a.path);
commandArgs.checkDir = external_commander_default.a.checkDir;
commandArgs.ignoreCheckDir = external_commander_default.a.ignoreCheckDir;
commandArgs.eslint_global = external_commander_default.a.eslintGlobal; //配置处理

var errorMsgList = [];

function initCheck() {
  var fts = external_cfonts_default.a;
  fts.say(src_packageJson.name, {
    font: "simple"
  });
  info(">>>>>>>>>>>>>>>>  Welcome to use ".concat(src_packageJson.name, " ").concat(src_packageJson.version, "<<<<<<<<<<<<<<<<<")); //检查更新

  external_update_notifier_default()({
    pkg: src_packageJson,
    updateCheckInterval: 0,
    shouldNotifyInNpmScript: true
  }).notify(); //打印当前命令

  info("Executing command: ", process.argv.join(" ")); //打印当前配置信息

  if (commandArgs.isDebug) {
    info("Current config is :", commandArgs);
  } //代码路径检查


  if (!commandArgs.codePath) {
    errorMsgList.push("Please specify the code path to check!");
    return;
  }

  if (!external_fs_default.a.existsSync(commandArgs.codePath)) {
    errorMsgList.push("Code path [".concat(commandArgs.codePath, "] does not exist!"));
  }
}

initCheck();

if (errorMsgList.length) {
  error(errorMsgList.join("\\n"));
  process.exit(1);
} //执行代码检查插件


var src_Checker = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Checker, _EventEmitter);

  var _super = _createSuper(Checker);

  function Checker() {
    var _this;

    src_classCallCheck(this, Checker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    src_defineProperty(_assertThisInitialized(_this), "pluginList", []);

    src_defineProperty(_assertThisInitialized(_this), "timeSpent", 0);

    return _this;
  }

  src_createClass(Checker, [{
    key: "process",
    value: function process() {
      var sw = new external_x_js_kit_default.a.timer.StopWatch();
      var resultList = []; //开始处理

      this.emit(CheckerEventNameEnum.START);
      sw.start();

      var _iterator = _createForOfIteratorHelper(this.pluginList),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var plugin = _step.value;
          //开始准备运行插件
          this.emit(CheckerEventNameEnum.ITEM_START, plugin.name); //运行插件

          plugin.run({
            commandArgs: commandArgs
          });
          resultList.push(plugin.result); //插件运行结束

          this.emit(CheckerEventNameEnum.ITEM_END, plugin);

          if (!plugin.isSuccess) {
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      sw.stop();
      this.timeSpent = sw.value / 1000;
      this.emit(CheckerEventNameEnum.RESULT, resultList);
      this.emit(CheckerEventNameEnum.END, this.pluginList.every(function (k) {
        return k.isSuccess;
      }));
    }
  }]);

  return Checker;
}(external_events_["EventEmitter"]);

var checker = new src_Checker();
checker.pluginList = plugins;
checker.on(CheckerEventNameEnum.START, function () {
  info("Start code checking...");
});
checker.on(CheckerEventNameEnum.ITEM_START, function (name) {
  info("Running plugin: [".concat(name, "]"));
});
checker.on(CheckerEventNameEnum.END, function (isAllSuccess) {
  info(">>>>>>>>>>>>>>>>  Code checked!  <<<<<<<<<<<<<<<<<");

  if (!isAllSuccess) {
    process.exit(1);
  }
});
checker.on(CheckerEventNameEnum.RESULT, function (resultList) {
  info(external_as_table_default()(resultList));
});
checker.on(CheckerEventNameEnum.ITEM_END, function (plugin) {
  if (plugin.isSuccess) {
    info("Plugin execute [".concat(plugin.name, "] Succeeded!"));
  } else {
    error("Plugin execute [".concat(plugin.name, "] Failed!"));
  }
});
checker.process();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map