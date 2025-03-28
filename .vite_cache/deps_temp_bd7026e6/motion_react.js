import {
  require_is_prop_valid_framer_motion
} from "./chunk-JBDS5O3U.js";
import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __commonJS
} from "./chunk-EWTE5DHJ.js";

// node_modules/framer-motion/dist/framer-motion.js
var require_framer_motion = __commonJS({
  "node_modules/framer-motion/dist/framer-motion.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module ? e(exports, require_react()) : "function" == typeof define && define.amd ? define(["exports", "react"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).Motion = {}, t.React);
    }(exports, function(t, e) {
      "use strict";
      function n(t2) {
        var e2 = /* @__PURE__ */ Object.create(null);
        return t2 && Object.keys(t2).forEach(function(n2) {
          if ("default" !== n2) {
            var i2 = Object.getOwnPropertyDescriptor(t2, n2);
            Object.defineProperty(e2, n2, i2.get ? i2 : { enumerable: true, get: function() {
              return t2[n2];
            } });
          }
        }), e2.default = t2, Object.freeze(e2);
      }
      var i = n(e), s = React, o = Symbol.for("react.element"), r = Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, l = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, u = { key: true, ref: true, __self: true, __source: true };
      function c(t2, e2, n2) {
        var i2, s2 = {}, r2 = null, c2 = null;
        for (i2 in void 0 !== n2 && (r2 = "" + n2), void 0 !== e2.key && (r2 = "" + e2.key), void 0 !== e2.ref && (c2 = e2.ref), e2) a.call(e2, i2) && !u.hasOwnProperty(i2) && (s2[i2] = e2[i2]);
        if (t2 && t2.defaultProps) for (i2 in e2 = t2.defaultProps) void 0 === s2[i2] && (s2[i2] = e2[i2]);
        return { $$typeof: o, type: t2, key: r2, ref: c2, props: s2, _owner: l.current };
      }
      const h = r, d = c, p = c, m = e.createContext({});
      function f(t2) {
        const n2 = e.useRef(null);
        return null === n2.current && (n2.current = t2()), n2.current;
      }
      const g = "undefined" != typeof window, y = g ? e.useLayoutEffect : e.useEffect, v = e.createContext(null), x = e.createContext({ transformPagePoint: (t2) => t2, isStatic: false, reducedMotion: "never" });
      class w extends i.Component {
        getSnapshotBeforeUpdate(t2) {
          const e2 = this.props.childRef.current;
          if (e2 && t2.isPresent && !this.props.isPresent) {
            const t3 = e2.offsetParent, n2 = t3 instanceof HTMLElement && t3.offsetWidth || 0, i2 = this.props.sizeRef.current;
            i2.height = e2.offsetHeight || 0, i2.width = e2.offsetWidth || 0, i2.top = e2.offsetTop, i2.left = e2.offsetLeft, i2.right = n2 - i2.width - i2.left;
          }
          return null;
        }
        componentDidUpdate() {
        }
        render() {
          return this.props.children;
        }
      }
      function P({ children: t2, isPresent: n2, anchorX: s2 }) {
        const o2 = e.useId(), r2 = e.useRef(null), a2 = e.useRef({ width: 0, height: 0, top: 0, left: 0, right: 0 }), { nonce: l2 } = e.useContext(x);
        return e.useInsertionEffect(() => {
          const { width: t3, height: e2, top: i2, left: u2, right: c2 } = a2.current;
          if (n2 || !r2.current || !t3 || !e2) return;
          const h2 = "left" === s2 ? "left: " + u2 : "right: " + c2;
          r2.current.dataset.motionPopId = o2;
          const d2 = document.createElement("style");
          return l2 && (d2.nonce = l2), document.head.appendChild(d2), d2.sheet && d2.sheet.insertRule(`
          [data-motion-pop-id="${o2}"] {
            position: absolute !important;
            width: ${t3}px !important;
            height: ${e2}px !important;
            ${h2}px !important;
            top: ${i2}px !important;
          }
        `), () => {
            document.head.removeChild(d2);
          };
        }, [n2]), d(w, { isPresent: n2, childRef: r2, sizeRef: a2, children: i.cloneElement(t2, { ref: r2 }) });
      }
      const S = ({ children: t2, initial: n2, isPresent: s2, onExitComplete: o2, custom: r2, presenceAffectsLayout: a2, mode: l2, anchorX: u2 }) => {
        const c2 = f(T), h2 = e.useId(), p2 = e.useCallback((t3) => {
          c2.set(t3, true);
          for (const t4 of c2.values()) if (!t4) return;
          o2 && o2();
        }, [c2, o2]), m2 = e.useMemo(() => ({ id: h2, initial: n2, isPresent: s2, custom: r2, onExitComplete: p2, register: (t3) => (c2.set(t3, false), () => c2.delete(t3)) }), a2 ? [Math.random(), p2] : [s2, p2]);
        return e.useMemo(() => {
          c2.forEach((t3, e2) => c2.set(e2, false));
        }, [s2]), i.useEffect(() => {
          !s2 && !c2.size && o2 && o2();
        }, [s2]), "popLayout" === l2 && (t2 = d(P, { isPresent: s2, anchorX: u2, children: t2 })), d(v.Provider, { value: m2, children: t2 });
      };
      function T() {
        return /* @__PURE__ */ new Map();
      }
      function b(t2 = true) {
        const n2 = e.useContext(v);
        if (null === n2) return [true, null];
        const { isPresent: i2, onExitComplete: s2, register: o2 } = n2, r2 = e.useId();
        e.useEffect(() => {
          if (t2) return o2(r2);
        }, [t2]);
        const a2 = e.useCallback(() => t2 && s2 && s2(r2), [r2, s2, t2]);
        return !i2 && s2 ? [false, a2] : [true];
      }
      const A = (t2) => t2.key || "";
      function E(t2) {
        const n2 = [];
        return e.Children.forEach(t2, (t3) => {
          e.isValidElement(t3) && n2.push(t3);
        }), n2;
      }
      const M = e.createContext(null);
      function C(t2, e2) {
        -1 === t2.indexOf(e2) && t2.push(e2);
      }
      function V(t2, e2) {
        const n2 = t2.indexOf(e2);
        n2 > -1 && t2.splice(n2, 1);
      }
      const R = (t2) => t2;
      let D = R, k = R;
      const L = { skipAnimations: false, useManualTiming: false };
      function B(t2) {
        let e2;
        return () => (void 0 === e2 && (e2 = t2()), e2);
      }
      const F = (t2, e2, n2) => {
        const i2 = e2 - t2;
        return 0 === i2 ? 1 : (n2 - t2) / i2;
      };
      class O {
        constructor() {
          this.subscriptions = [];
        }
        add(t2) {
          return C(this.subscriptions, t2), () => V(this.subscriptions, t2);
        }
        notify(t2, e2, n2) {
          const i2 = this.subscriptions.length;
          if (i2) if (1 === i2) this.subscriptions[0](t2, e2, n2);
          else for (let s2 = 0; s2 < i2; s2++) {
            const i3 = this.subscriptions[s2];
            i3 && i3(t2, e2, n2);
          }
        }
        getSize() {
          return this.subscriptions.length;
        }
        clear() {
          this.subscriptions.length = 0;
        }
      }
      const j = (t2) => 1e3 * t2, I = (t2) => t2 / 1e3;
      function U(t2, e2) {
        return e2 ? t2 * (1e3 / e2) : 0;
      }
      const W = B(() => void 0 !== window.ScrollTimeline);
      class N extends class {
        constructor(t2) {
          this.stop = () => this.runAll("stop"), this.animations = t2.filter(Boolean);
        }
        get finished() {
          return Promise.all(this.animations.map((t2) => "finished" in t2 ? t2.finished : t2));
        }
        getAll(t2) {
          return this.animations[0][t2];
        }
        setAll(t2, e2) {
          for (let n2 = 0; n2 < this.animations.length; n2++) this.animations[n2][t2] = e2;
        }
        attachTimeline(t2, e2) {
          const n2 = this.animations.map((n3) => W() && n3.attachTimeline ? n3.attachTimeline(t2) : "function" == typeof e2 ? e2(n3) : void 0);
          return () => {
            n2.forEach((t3, e3) => {
              t3 && t3(), this.animations[e3].stop();
            });
          };
        }
        get time() {
          return this.getAll("time");
        }
        set time(t2) {
          this.setAll("time", t2);
        }
        get speed() {
          return this.getAll("speed");
        }
        set speed(t2) {
          this.setAll("speed", t2);
        }
        get startTime() {
          return this.getAll("startTime");
        }
        get duration() {
          let t2 = 0;
          for (let e2 = 0; e2 < this.animations.length; e2++) t2 = Math.max(t2, this.animations[e2].duration);
          return t2;
        }
        runAll(t2) {
          this.animations.forEach((e2) => e2[t2]());
        }
        flatten() {
          this.runAll("flatten");
        }
        play() {
          this.runAll("play");
        }
        pause() {
          this.runAll("pause");
        }
        cancel() {
          this.runAll("cancel");
        }
        complete() {
          this.runAll("complete");
        }
      } {
        then(t2, e2) {
          return Promise.all(this.animations).then(t2).catch(e2);
        }
      }
      function z(t2, e2) {
        return t2 ? t2[e2] || t2.default || t2 : void 0;
      }
      function $(t2) {
        let e2 = 0;
        let n2 = t2.next(e2);
        for (; !n2.done && e2 < 2e4; ) e2 += 50, n2 = t2.next(e2);
        return e2 >= 2e4 ? 1 / 0 : e2;
      }
      function H(t2, e2 = 100, n2) {
        const i2 = n2({ ...t2, keyframes: [0, e2] }), s2 = Math.min($(i2), 2e4);
        return { type: "keyframes", ease: (t3) => i2.next(s2 * t3).value / e2, duration: I(s2) };
      }
      function X(t2) {
        return "function" == typeof t2;
      }
      function Y(t2, e2) {
        t2.timeline = e2, t2.onfinish = null;
      }
      const K = (t2) => Array.isArray(t2) && "number" == typeof t2[0], G = { linearEasing: void 0 };
      function _(t2, e2) {
        const n2 = B(t2);
        return () => {
          var t3;
          return null !== (t3 = G[e2]) && void 0 !== t3 ? t3 : n2();
        };
      }
      const q = _(() => {
        try {
          document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
        } catch (t2) {
          return false;
        }
        return true;
      }, "linearEasing"), Z = (t2, e2, n2 = 10) => {
        let i2 = "";
        const s2 = Math.max(Math.round(e2 / n2), 2);
        for (let e3 = 0; e3 < s2; e3++) i2 += t2(F(0, s2 - 1, e3)) + ", ";
        return `linear(${i2.substring(0, i2.length - 2)})`;
      };
      function J(t2) {
        return Boolean("function" == typeof t2 && q() || !t2 || "string" == typeof t2 && (t2 in tt || q()) || K(t2) || Array.isArray(t2) && t2.every(J));
      }
      const Q = ([t2, e2, n2, i2]) => `cubic-bezier(${t2}, ${e2}, ${n2}, ${i2})`, tt = { linear: "linear", ease: "ease", easeIn: "ease-in", easeOut: "ease-out", easeInOut: "ease-in-out", circIn: Q([0, 0.65, 0.55, 1]), circOut: Q([0.55, 0, 1, 0.45]), backIn: Q([0.31, 0.01, 0.66, -0.59]), backOut: Q([0.33, 1.53, 0.69, 0.99]) };
      const et = ["read", "resolveKeyframes", "update", "preRender", "render", "postRender"], nt = { value: null, addProjectionMetrics: null };
      function it(t2, e2) {
        let n2 = false, i2 = true;
        const s2 = { delta: 0, timestamp: 0, isProcessing: false }, o2 = () => n2 = true, r2 = et.reduce((t3, n3) => (t3[n3] = /* @__PURE__ */ function(t4, e3) {
          let n4 = /* @__PURE__ */ new Set(), i3 = /* @__PURE__ */ new Set(), s3 = false, o3 = false;
          const r3 = /* @__PURE__ */ new WeakSet();
          let a3 = { delta: 0, timestamp: 0, isProcessing: false }, l3 = 0;
          function u3(e4) {
            r3.has(e4) && (c3.schedule(e4), t4()), l3++, e4(a3);
          }
          const c3 = { schedule: (t5, e4 = false, o4 = false) => {
            const a4 = o4 && s3 ? n4 : i3;
            return e4 && r3.add(t5), a4.has(t5) || a4.add(t5), t5;
          }, cancel: (t5) => {
            i3.delete(t5), r3.delete(t5);
          }, process: (t5) => {
            a3 = t5, s3 ? o3 = true : (s3 = true, [n4, i3] = [i3, n4], n4.forEach(u3), e3 && nt.value && nt.value.frameloop[e3].push(l3), l3 = 0, n4.clear(), s3 = false, o3 && (o3 = false, c3.process(t5)));
          } };
          return c3;
        }(o2, e2 ? n3 : void 0), t3), {}), { read: a2, resolveKeyframes: l2, update: u2, preRender: c2, render: h2, postRender: d2 } = r2, p2 = () => {
          const o3 = L.useManualTiming ? s2.timestamp : performance.now();
          n2 = false, L.useManualTiming || (s2.delta = i2 ? 1e3 / 60 : Math.max(Math.min(o3 - s2.timestamp, 40), 1)), s2.timestamp = o3, s2.isProcessing = true, a2.process(s2), l2.process(s2), u2.process(s2), c2.process(s2), h2.process(s2), d2.process(s2), s2.isProcessing = false, n2 && e2 && (i2 = false, t2(p2));
        };
        return { schedule: et.reduce((e3, o3) => {
          const a3 = r2[o3];
          return e3[o3] = (e4, o4 = false, r3 = false) => (n2 || (n2 = true, i2 = true, s2.isProcessing || t2(p2)), a3.schedule(e4, o4, r3)), e3;
        }, {}), cancel: (t3) => {
          for (let e3 = 0; e3 < et.length; e3++) r2[et[e3]].cancel(t3);
        }, state: s2, steps: r2 };
      }
      const { schedule: st, cancel: ot, state: rt, steps: at } = it("undefined" != typeof requestAnimationFrame ? requestAnimationFrame : R, true), { schedule: lt, cancel: ut } = it(queueMicrotask, false);
      let ct;
      function ht() {
        ct = void 0;
      }
      const dt = { now: () => (void 0 === ct && dt.set(rt.isProcessing || L.useManualTiming ? rt.timestamp : performance.now()), ct), set: (t2) => {
        ct = t2, queueMicrotask(ht);
      } }, pt = { x: false, y: false };
      function mt() {
        return pt.x || pt.y;
      }
      function ft(t2, e2, n2) {
        var i2;
        if (t2 instanceof EventTarget) return [t2];
        if ("string" == typeof t2) {
          let s2 = document;
          e2 && (s2 = e2.current);
          const o2 = null !== (i2 = null == n2 ? void 0 : n2[t2]) && void 0 !== i2 ? i2 : s2.querySelectorAll(t2);
          return o2 ? Array.from(o2) : [];
        }
        return Array.from(t2);
      }
      function gt(t2, e2) {
        const n2 = ft(t2), i2 = new AbortController();
        return [n2, { passive: true, ...e2, signal: i2.signal }, () => i2.abort()];
      }
      function yt(t2) {
        return !("touch" === t2.pointerType || mt());
      }
      function vt(t2, e2, n2 = {}) {
        const [i2, s2, o2] = gt(t2, n2), r2 = (t3) => {
          if (!yt(t3)) return;
          const { target: n3 } = t3, i3 = e2(n3, t3);
          if ("function" != typeof i3 || !n3) return;
          const o3 = (t4) => {
            yt(t4) && (i3(t4), n3.removeEventListener("pointerleave", o3));
          };
          n3.addEventListener("pointerleave", o3, s2);
        };
        return i2.forEach((t3) => {
          t3.addEventListener("pointerenter", r2, s2);
        }), o2;
      }
      const xt = (t2, e2) => !!e2 && (t2 === e2 || xt(t2, e2.parentElement)), wt = (t2) => "mouse" === t2.pointerType ? "number" != typeof t2.button || t2.button <= 0 : false !== t2.isPrimary, Pt = /* @__PURE__ */ new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
      const St = /* @__PURE__ */ new WeakSet();
      function Tt(t2) {
        return (e2) => {
          "Enter" === e2.key && t2(e2);
        };
      }
      function bt(t2, e2) {
        t2.dispatchEvent(new PointerEvent("pointer" + e2, { isPrimary: true, bubbles: true }));
      }
      function At(t2) {
        return wt(t2) && !mt();
      }
      function Et(t2, e2, n2 = {}) {
        const [i2, s2, o2] = gt(t2, n2), r2 = (t3) => {
          const i3 = t3.currentTarget;
          if (!At(t3) || St.has(i3)) return;
          St.add(i3);
          const o3 = e2(i3, t3), r3 = (t4, e3) => {
            window.removeEventListener("pointerup", a2), window.removeEventListener("pointercancel", l2), At(t4) && St.has(i3) && (St.delete(i3), "function" == typeof o3 && o3(t4, { success: e3 }));
          }, a2 = (t4) => {
            r3(t4, i3 === window || i3 === document || n2.useGlobalTarget || xt(i3, t4.target));
          }, l2 = (t4) => {
            r3(t4, false);
          };
          window.addEventListener("pointerup", a2, s2), window.addEventListener("pointercancel", l2, s2);
        };
        return i2.forEach((t3) => {
          var e3;
          (n2.useGlobalTarget ? window : t3).addEventListener("pointerdown", r2, s2), t3 instanceof HTMLElement && (t3.addEventListener("focus", (t4) => ((t5, e4) => {
            const n3 = t5.currentTarget;
            if (!n3) return;
            const i3 = Tt(() => {
              if (St.has(n3)) return;
              bt(n3, "down");
              const t6 = Tt(() => {
                bt(n3, "up");
              });
              n3.addEventListener("keyup", t6, e4), n3.addEventListener("blur", () => bt(n3, "cancel"), e4);
            });
            n3.addEventListener("keydown", i3, e4), n3.addEventListener("blur", () => n3.removeEventListener("keydown", i3), e4);
          })(t4, s2)), e3 = t3, Pt.has(e3.tagName) || -1 !== e3.tabIndex || null !== t3.tabIndex || (t3.tabIndex = 0));
        }), o2;
      }
      const Mt = { current: void 0 };
      class Ct {
        constructor(t2, e2 = {}) {
          this.version = "12.6.1", this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (t3, e3 = true) => {
            const n2 = dt.now();
            this.updatedAt !== n2 && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(t3), this.current !== this.prev && this.events.change && this.events.change.notify(this.current), e3 && this.events.renderRequest && this.events.renderRequest.notify(this.current);
          }, this.hasAnimated = false, this.setCurrent(t2), this.owner = e2.owner;
        }
        setCurrent(t2) {
          var e2;
          this.current = t2, this.updatedAt = dt.now(), null === this.canTrackVelocity && void 0 !== t2 && (this.canTrackVelocity = (e2 = this.current, !isNaN(parseFloat(e2))));
        }
        setPrevFrameValue(t2 = this.current) {
          this.prevFrameValue = t2, this.prevUpdatedAt = this.updatedAt;
        }
        onChange(t2) {
          return this.on("change", t2);
        }
        on(t2, e2) {
          this.events[t2] || (this.events[t2] = new O());
          const n2 = this.events[t2].add(e2);
          return "change" === t2 ? () => {
            n2(), st.read(() => {
              this.events.change.getSize() || this.stop();
            });
          } : n2;
        }
        clearListeners() {
          for (const t2 in this.events) this.events[t2].clear();
        }
        attach(t2, e2) {
          this.passiveEffect = t2, this.stopPassiveEffect = e2;
        }
        set(t2, e2 = true) {
          e2 && this.passiveEffect ? this.passiveEffect(t2, this.updateAndNotify) : this.updateAndNotify(t2, e2);
        }
        setWithVelocity(t2, e2, n2) {
          this.set(e2), this.prev = void 0, this.prevFrameValue = t2, this.prevUpdatedAt = this.updatedAt - n2;
        }
        jump(t2, e2 = true) {
          this.updateAndNotify(t2), this.prev = t2, this.prevUpdatedAt = this.prevFrameValue = void 0, e2 && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
        }
        get() {
          return Mt.current && Mt.current.push(this), this.current;
        }
        getPrevious() {
          return this.prev;
        }
        getVelocity() {
          const t2 = dt.now();
          if (!this.canTrackVelocity || void 0 === this.prevFrameValue || t2 - this.updatedAt > 30) return 0;
          const e2 = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
          return U(parseFloat(this.current) - parseFloat(this.prevFrameValue), e2);
        }
        start(t2) {
          return this.stop(), new Promise((e2) => {
            this.hasAnimated = true, this.animation = t2(e2), this.events.animationStart && this.events.animationStart.notify();
          }).then(() => {
            this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
          });
        }
        stop() {
          this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
        }
        isAnimating() {
          return !!this.animation;
        }
        clearAnimation() {
          delete this.animation;
        }
        destroy() {
          this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
        }
      }
      function Vt(t2, e2) {
        return new Ct(t2, e2);
      }
      const Rt = (t2, e2, n2) => t2 + (e2 - t2) * n2;
      function Dt(t2) {
        return t2.max - t2.min;
      }
      function kt(t2, e2, n2, i2 = 0.5) {
        t2.origin = i2, t2.originPoint = Rt(e2.min, e2.max, t2.origin), t2.scale = Dt(n2) / Dt(e2), t2.translate = Rt(n2.min, n2.max, t2.origin) - t2.originPoint, (t2.scale >= 0.9999 && t2.scale <= 1.0001 || isNaN(t2.scale)) && (t2.scale = 1), (t2.translate >= -0.01 && t2.translate <= 0.01 || isNaN(t2.translate)) && (t2.translate = 0);
      }
      function Lt(t2, e2, n2, i2) {
        kt(t2.x, e2.x, n2.x, i2 ? i2.originX : void 0), kt(t2.y, e2.y, n2.y, i2 ? i2.originY : void 0);
      }
      function Bt(t2, e2, n2) {
        t2.min = n2.min + e2.min, t2.max = t2.min + Dt(e2);
      }
      function Ft(t2, e2, n2) {
        t2.min = e2.min - n2.min, t2.max = t2.min + Dt(e2);
      }
      function Ot(t2, e2, n2) {
        Ft(t2.x, e2.x, n2.x), Ft(t2.y, e2.y, n2.y);
      }
      const jt = (t2) => !t2.isLayoutDirty && t2.willUpdate(false);
      function It() {
        const t2 = /* @__PURE__ */ new Set(), e2 = /* @__PURE__ */ new WeakMap(), n2 = () => t2.forEach(jt);
        return { add: (i2) => {
          t2.add(i2), e2.set(i2, i2.addEventListener("willUpdate", n2));
        }, remove: (i2) => {
          t2.delete(i2);
          const s2 = e2.get(i2);
          s2 && (s2(), e2.delete(i2)), n2();
        }, dirty: n2 };
      }
      const Ut = (t2) => Boolean(t2 && t2.getVelocity), Wt = { current: false }, Nt = (t2, e2, n2) => (((1 - 3 * n2 + 3 * e2) * t2 + (3 * n2 - 6 * e2)) * t2 + 3 * e2) * t2;
      function zt(t2, e2, n2, i2) {
        if (t2 === e2 && n2 === i2) return R;
        const s2 = (e3) => function(t3, e4, n3, i3, s3) {
          let o2, r2, a2 = 0;
          do {
            r2 = e4 + (n3 - e4) / 2, o2 = Nt(r2, i3, s3) - t3, o2 > 0 ? n3 = r2 : e4 = r2;
          } while (Math.abs(o2) > 1e-7 && ++a2 < 12);
          return r2;
        }(e3, 0, 1, t2, n2);
        return (t3) => 0 === t3 || 1 === t3 ? t3 : Nt(s2(t3), e2, i2);
      }
      const $t = (t2) => (e2) => e2 <= 0.5 ? t2(2 * e2) / 2 : (2 - t2(2 * (1 - e2))) / 2, Ht = (t2) => (e2) => 1 - t2(1 - e2), Xt = zt(0.33, 1.53, 0.69, 0.99), Yt = Ht(Xt), Kt = $t(Yt), Gt = (t2) => (t2 *= 2) < 1 ? 0.5 * Yt(t2) : 0.5 * (2 - Math.pow(2, -10 * (t2 - 1))), _t = (t2) => 1 - Math.sin(Math.acos(t2)), qt = Ht(_t), Zt = $t(_t), Jt = (t2) => /^0[^.\s]+$/u.test(t2);
      const Qt = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"], te = new Set(Qt), ee = /* @__PURE__ */ new Set(["width", "height", "top", "left", "right", "bottom", ...Qt]), ne = (t2, e2, n2) => n2 > e2 ? e2 : n2 < t2 ? t2 : n2, ie = { test: (t2) => "number" == typeof t2, parse: parseFloat, transform: (t2) => t2 }, se = { ...ie, transform: (t2) => ne(0, 1, t2) }, oe = { ...ie, default: 1 }, re = (t2) => Math.round(1e5 * t2) / 1e5, ae = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
      const le = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, ue = (t2, e2) => (n2) => Boolean("string" == typeof n2 && le.test(n2) && n2.startsWith(t2) || e2 && !function(t3) {
        return null == t3;
      }(n2) && Object.prototype.hasOwnProperty.call(n2, e2)), ce = (t2, e2, n2) => (i2) => {
        if ("string" != typeof i2) return i2;
        const [s2, o2, r2, a2] = i2.match(ae);
        return { [t2]: parseFloat(s2), [e2]: parseFloat(o2), [n2]: parseFloat(r2), alpha: void 0 !== a2 ? parseFloat(a2) : 1 };
      }, he = { ...ie, transform: (t2) => Math.round(((t3) => ne(0, 255, t3))(t2)) }, de = { test: ue("rgb", "red"), parse: ce("red", "green", "blue"), transform: ({ red: t2, green: e2, blue: n2, alpha: i2 = 1 }) => "rgba(" + he.transform(t2) + ", " + he.transform(e2) + ", " + he.transform(n2) + ", " + re(se.transform(i2)) + ")" };
      const pe = { test: ue("#"), parse: function(t2) {
        let e2 = "", n2 = "", i2 = "", s2 = "";
        return t2.length > 5 ? (e2 = t2.substring(1, 3), n2 = t2.substring(3, 5), i2 = t2.substring(5, 7), s2 = t2.substring(7, 9)) : (e2 = t2.substring(1, 2), n2 = t2.substring(2, 3), i2 = t2.substring(3, 4), s2 = t2.substring(4, 5), e2 += e2, n2 += n2, i2 += i2, s2 += s2), { red: parseInt(e2, 16), green: parseInt(n2, 16), blue: parseInt(i2, 16), alpha: s2 ? parseInt(s2, 16) / 255 : 1 };
      }, transform: de.transform }, me = (t2) => ({ test: (e2) => "string" == typeof e2 && e2.endsWith(t2) && 1 === e2.split(" ").length, parse: parseFloat, transform: (e2) => `${e2}${t2}` }), fe = me("deg"), ge = me("%"), ye = me("px"), ve = me("vh"), xe = me("vw"), we = { ...ge, parse: (t2) => ge.parse(t2) / 100, transform: (t2) => ge.transform(100 * t2) }, Pe = { test: ue("hsl", "hue"), parse: ce("hue", "saturation", "lightness"), transform: ({ hue: t2, saturation: e2, lightness: n2, alpha: i2 = 1 }) => "hsla(" + Math.round(t2) + ", " + ge.transform(re(e2)) + ", " + ge.transform(re(n2)) + ", " + re(se.transform(i2)) + ")" }, Se = { test: (t2) => de.test(t2) || pe.test(t2) || Pe.test(t2), parse: (t2) => de.test(t2) ? de.parse(t2) : Pe.test(t2) ? Pe.parse(t2) : pe.parse(t2), transform: (t2) => "string" == typeof t2 ? t2 : t2.hasOwnProperty("red") ? de.transform(t2) : Pe.transform(t2) }, Te = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
      const be = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
      function Ae(t2) {
        const e2 = t2.toString(), n2 = [], i2 = { color: [], number: [], var: [] }, s2 = [];
        let o2 = 0;
        const r2 = e2.replace(be, (t3) => (Se.test(t3) ? (i2.color.push(o2), s2.push("color"), n2.push(Se.parse(t3))) : t3.startsWith("var(") ? (i2.var.push(o2), s2.push("var"), n2.push(t3)) : (i2.number.push(o2), s2.push("number"), n2.push(parseFloat(t3))), ++o2, "${}")).split("${}");
        return { values: n2, split: r2, indexes: i2, types: s2 };
      }
      function Ee(t2) {
        return Ae(t2).values;
      }
      function Me(t2) {
        const { split: e2, types: n2 } = Ae(t2), i2 = e2.length;
        return (t3) => {
          let s2 = "";
          for (let o2 = 0; o2 < i2; o2++) if (s2 += e2[o2], void 0 !== t3[o2]) {
            const e3 = n2[o2];
            s2 += "number" === e3 ? re(t3[o2]) : "color" === e3 ? Se.transform(t3[o2]) : t3[o2];
          }
          return s2;
        };
      }
      const Ce = (t2) => "number" == typeof t2 ? 0 : t2;
      const Ve = { test: function(t2) {
        var e2, n2;
        return isNaN(t2) && "string" == typeof t2 && ((null === (e2 = t2.match(ae)) || void 0 === e2 ? void 0 : e2.length) || 0) + ((null === (n2 = t2.match(Te)) || void 0 === n2 ? void 0 : n2.length) || 0) > 0;
      }, parse: Ee, createTransformer: Me, getAnimatableNone: function(t2) {
        const e2 = Ee(t2);
        return Me(t2)(e2.map(Ce));
      } }, Re = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
      function De(t2) {
        const [e2, n2] = t2.slice(0, -1).split("(");
        if ("drop-shadow" === e2) return t2;
        const [i2] = n2.match(ae) || [];
        if (!i2) return t2;
        const s2 = n2.replace(i2, "");
        let o2 = Re.has(e2) ? 1 : 0;
        return i2 !== n2 && (o2 *= 100), e2 + "(" + o2 + s2 + ")";
      }
      const ke = /\b([a-z-]*)\(.*?\)/gu, Le = { ...Ve, getAnimatableNone: (t2) => {
        const e2 = t2.match(ke);
        return e2 ? e2.map(De).join(" ") : t2;
      } }, Be = { borderWidth: ye, borderTopWidth: ye, borderRightWidth: ye, borderBottomWidth: ye, borderLeftWidth: ye, borderRadius: ye, radius: ye, borderTopLeftRadius: ye, borderTopRightRadius: ye, borderBottomRightRadius: ye, borderBottomLeftRadius: ye, width: ye, maxWidth: ye, height: ye, maxHeight: ye, top: ye, right: ye, bottom: ye, left: ye, padding: ye, paddingTop: ye, paddingRight: ye, paddingBottom: ye, paddingLeft: ye, margin: ye, marginTop: ye, marginRight: ye, marginBottom: ye, marginLeft: ye, backgroundPositionX: ye, backgroundPositionY: ye }, Fe = { rotate: fe, rotateX: fe, rotateY: fe, rotateZ: fe, scale: oe, scaleX: oe, scaleY: oe, scaleZ: oe, skew: fe, skewX: fe, skewY: fe, distance: ye, translateX: ye, translateY: ye, translateZ: ye, x: ye, y: ye, z: ye, perspective: ye, transformPerspective: ye, opacity: se, originX: we, originY: we, originZ: ye }, Oe = { ...ie, transform: Math.round }, je = { ...Be, ...Fe, zIndex: Oe, size: ye, fillOpacity: se, strokeOpacity: se, numOctaves: Oe }, Ie = { ...je, color: Se, backgroundColor: Se, outlineColor: Se, fill: Se, stroke: Se, borderColor: Se, borderTopColor: Se, borderRightColor: Se, borderBottomColor: Se, borderLeftColor: Se, filter: Le, WebkitFilter: Le }, Ue = (t2) => Ie[t2];
      function We(t2, e2) {
        let n2 = Ue(t2);
        return n2 !== Le && (n2 = Ve), n2.getAnimatableNone ? n2.getAnimatableNone(e2) : void 0;
      }
      const Ne = /* @__PURE__ */ new Set(["auto", "none", "0"]);
      const ze = (t2) => 180 * t2 / Math.PI, $e = (t2) => {
        const e2 = ze(Math.atan2(t2[1], t2[0]));
        return Xe(e2);
      }, He = { x: 4, y: 5, translateX: 4, translateY: 5, scaleX: 0, scaleY: 3, scale: (t2) => (Math.abs(t2[0]) + Math.abs(t2[3])) / 2, rotate: $e, rotateZ: $e, skewX: (t2) => ze(Math.atan(t2[1])), skewY: (t2) => ze(Math.atan(t2[2])), skew: (t2) => (Math.abs(t2[1]) + Math.abs(t2[2])) / 2 }, Xe = (t2) => ((t2 %= 360) < 0 && (t2 += 360), t2), Ye = (t2) => Math.sqrt(t2[0] * t2[0] + t2[1] * t2[1]), Ke = (t2) => Math.sqrt(t2[4] * t2[4] + t2[5] * t2[5]), Ge = { x: 12, y: 13, z: 14, translateX: 12, translateY: 13, translateZ: 14, scaleX: Ye, scaleY: Ke, scale: (t2) => (Ye(t2) + Ke(t2)) / 2, rotateX: (t2) => Xe(ze(Math.atan2(t2[6], t2[5]))), rotateY: (t2) => Xe(ze(Math.atan2(-t2[2], t2[0]))), rotateZ: $e, rotate: $e, skewX: (t2) => ze(Math.atan(t2[4])), skewY: (t2) => ze(Math.atan(t2[1])), skew: (t2) => (Math.abs(t2[1]) + Math.abs(t2[4])) / 2 };
      function _e(t2) {
        return t2.includes("scale") ? 1 : 0;
      }
      function qe(t2, e2) {
        if (!t2 || "none" === t2) return _e(e2);
        const n2 = t2.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
        let i2, s2;
        if (n2) i2 = Ge, s2 = n2;
        else {
          const e3 = t2.match(/^matrix\(([-\d.e\s,]+)\)$/u);
          i2 = He, s2 = e3;
        }
        if (!s2) return _e(e2);
        const o2 = i2[e2], r2 = s2[1].split(",").map(Ze);
        return "function" == typeof o2 ? o2(r2) : r2[o2];
      }
      function Ze(t2) {
        return parseFloat(t2.trim());
      }
      const Je = (t2) => t2 === ie || t2 === ye, Qe = /* @__PURE__ */ new Set(["x", "y", "z"]), tn = Qt.filter((t2) => !Qe.has(t2));
      const en = { width: ({ x: t2 }, { paddingLeft: e2 = "0", paddingRight: n2 = "0" }) => t2.max - t2.min - parseFloat(e2) - parseFloat(n2), height: ({ y: t2 }, { paddingTop: e2 = "0", paddingBottom: n2 = "0" }) => t2.max - t2.min - parseFloat(e2) - parseFloat(n2), top: (t2, { top: e2 }) => parseFloat(e2), left: (t2, { left: e2 }) => parseFloat(e2), bottom: ({ y: t2 }, { top: e2 }) => parseFloat(e2) + (t2.max - t2.min), right: ({ x: t2 }, { left: e2 }) => parseFloat(e2) + (t2.max - t2.min), x: (t2, { transform: e2 }) => qe(e2, "x"), y: (t2, { transform: e2 }) => qe(e2, "y") };
      en.translateX = en.x, en.translateY = en.y;
      const nn = /* @__PURE__ */ new Set();
      let sn = false, on = false;
      function rn() {
        if (on) {
          const t2 = Array.from(nn).filter((t3) => t3.needsMeasurement), e2 = new Set(t2.map((t3) => t3.element)), n2 = /* @__PURE__ */ new Map();
          e2.forEach((t3) => {
            const e3 = function(t4) {
              const e4 = [];
              return tn.forEach((n3) => {
                const i2 = t4.getValue(n3);
                void 0 !== i2 && (e4.push([n3, i2.get()]), i2.set(n3.startsWith("scale") ? 1 : 0));
              }), e4;
            }(t3);
            e3.length && (n2.set(t3, e3), t3.render());
          }), t2.forEach((t3) => t3.measureInitialState()), e2.forEach((t3) => {
            t3.render();
            const e3 = n2.get(t3);
            e3 && e3.forEach(([e4, n3]) => {
              var i2;
              null === (i2 = t3.getValue(e4)) || void 0 === i2 || i2.set(n3);
            });
          }), t2.forEach((t3) => t3.measureEndState()), t2.forEach((t3) => {
            void 0 !== t3.suspendedScrollY && window.scrollTo(0, t3.suspendedScrollY);
          });
        }
        on = false, sn = false, nn.forEach((t2) => t2.complete()), nn.clear();
      }
      function an() {
        nn.forEach((t2) => {
          t2.readKeyframes(), t2.needsMeasurement && (on = true);
        });
      }
      class ln {
        constructor(t2, e2, n2, i2, s2, o2 = false) {
          this.isComplete = false, this.isAsync = false, this.needsMeasurement = false, this.isScheduled = false, this.unresolvedKeyframes = [...t2], this.onComplete = e2, this.name = n2, this.motionValue = i2, this.element = s2, this.isAsync = o2;
        }
        scheduleResolve() {
          this.isScheduled = true, this.isAsync ? (nn.add(this), sn || (sn = true, st.read(an), st.resolveKeyframes(rn))) : (this.readKeyframes(), this.complete());
        }
        readKeyframes() {
          const { unresolvedKeyframes: t2, name: e2, element: n2, motionValue: i2 } = this;
          for (let s2 = 0; s2 < t2.length; s2++) if (null === t2[s2]) if (0 === s2) {
            const s3 = null == i2 ? void 0 : i2.get(), o2 = t2[t2.length - 1];
            if (void 0 !== s3) t2[0] = s3;
            else if (n2 && e2) {
              const i3 = n2.readValue(e2, o2);
              null != i3 && (t2[0] = i3);
            }
            void 0 === t2[0] && (t2[0] = o2), i2 && void 0 === s3 && i2.set(t2[0]);
          } else t2[s2] = t2[s2 - 1];
        }
        setFinalKeyframe() {
        }
        measureInitialState() {
        }
        renderEndStyles() {
        }
        measureEndState() {
        }
        complete() {
          this.isComplete = true, this.onComplete(this.unresolvedKeyframes, this.finalKeyframe), nn.delete(this);
        }
        cancel() {
          this.isComplete || (this.isScheduled = false, nn.delete(this));
        }
        resume() {
          this.isComplete || this.scheduleResolve();
        }
      }
      const un = (t2) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t2), cn = (t2) => (e2) => "string" == typeof e2 && e2.startsWith(t2), hn = cn("--"), dn = cn("var(--"), pn = (t2) => !!dn(t2) && mn.test(t2.split("/*")[0].trim()), mn = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, fn = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
      function gn(t2, e2, n2 = 1) {
        const [i2, s2] = function(t3) {
          const e3 = fn.exec(t3);
          if (!e3) return [,];
          const [, n3, i3, s3] = e3;
          return ["--" + (null != n3 ? n3 : i3), s3];
        }(t2);
        if (!i2) return;
        const o2 = window.getComputedStyle(e2).getPropertyValue(i2);
        if (o2) {
          const t3 = o2.trim();
          return un(t3) ? parseFloat(t3) : t3;
        }
        return pn(s2) ? gn(s2, e2, n2 + 1) : s2;
      }
      const yn = (t2) => (e2) => e2.test(t2), vn = [ie, ye, ge, fe, xe, ve, { test: (t2) => "auto" === t2, parse: (t2) => t2 }], xn = (t2) => vn.find(yn(t2));
      class wn extends ln {
        constructor(t2, e2, n2, i2, s2) {
          super(t2, e2, n2, i2, s2, true);
        }
        readKeyframes() {
          const { unresolvedKeyframes: t2, element: e2, name: n2 } = this;
          if (!e2 || !e2.current) return;
          super.readKeyframes();
          for (let n3 = 0; n3 < t2.length; n3++) {
            let i3 = t2[n3];
            if ("string" == typeof i3 && (i3 = i3.trim(), pn(i3))) {
              const s3 = gn(i3, e2.current);
              void 0 !== s3 && (t2[n3] = s3), n3 === t2.length - 1 && (this.finalKeyframe = i3);
            }
          }
          if (this.resolveNoneKeyframes(), !ee.has(n2) || 2 !== t2.length) return;
          const [i2, s2] = t2, o2 = xn(i2), r2 = xn(s2);
          if (o2 !== r2) if (Je(o2) && Je(r2)) for (let e3 = 0; e3 < t2.length; e3++) {
            const n3 = t2[e3];
            "string" == typeof n3 && (t2[e3] = parseFloat(n3));
          }
          else this.needsMeasurement = true;
        }
        resolveNoneKeyframes() {
          const { unresolvedKeyframes: t2, name: e2 } = this, n2 = [];
          for (let e3 = 0; e3 < t2.length; e3++) ("number" == typeof (i2 = t2[e3]) ? 0 === i2 : null === i2 || "none" === i2 || "0" === i2 || Jt(i2)) && n2.push(e3);
          var i2;
          n2.length && function(t3, e3, n3) {
            let i3 = 0, s2 = void 0;
            for (; i3 < t3.length && !s2; ) {
              const e4 = t3[i3];
              "string" == typeof e4 && !Ne.has(e4) && Ae(e4).values.length && (s2 = t3[i3]), i3++;
            }
            if (s2 && n3) for (const i4 of e3) t3[i4] = We(n3, s2);
          }(t2, n2, e2);
        }
        measureInitialState() {
          const { element: t2, unresolvedKeyframes: e2, name: n2 } = this;
          if (!t2 || !t2.current) return;
          "height" === n2 && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = en[n2](t2.measureViewportBox(), window.getComputedStyle(t2.current)), e2[0] = this.measuredOrigin;
          const i2 = e2[e2.length - 1];
          void 0 !== i2 && t2.getValue(n2, i2).jump(i2, false);
        }
        measureEndState() {
          var t2;
          const { element: e2, name: n2, unresolvedKeyframes: i2 } = this;
          if (!e2 || !e2.current) return;
          const s2 = e2.getValue(n2);
          s2 && s2.jump(this.measuredOrigin, false);
          const o2 = i2.length - 1, r2 = i2[o2];
          i2[o2] = en[n2](e2.measureViewportBox(), window.getComputedStyle(e2.current)), null !== r2 && void 0 === this.finalKeyframe && (this.finalKeyframe = r2), (null === (t2 = this.removedTransforms) || void 0 === t2 ? void 0 : t2.length) && this.removedTransforms.forEach(([t3, n3]) => {
            e2.getValue(t3).set(n3);
          }), this.resolveNoneKeyframes();
        }
      }
      const Pn = (t2, e2) => "zIndex" !== e2 && (!("number" != typeof t2 && !Array.isArray(t2)) || !("string" != typeof t2 || !Ve.test(t2) && "0" !== t2 || t2.startsWith("url(")));
      function Sn(t2, e2, n2, i2) {
        const s2 = t2[0];
        if (null === s2) return false;
        if ("display" === e2 || "visibility" === e2) return true;
        const o2 = t2[t2.length - 1], r2 = Pn(s2, e2), a2 = Pn(o2, e2);
        return !(!r2 || !a2) && (function(t3) {
          const e3 = t3[0];
          if (1 === t3.length) return true;
          for (let n3 = 0; n3 < t3.length; n3++) if (t3[n3] !== e3) return true;
        }(t2) || ("spring" === n2 || X(n2)) && i2);
      }
      const Tn = (t2) => null !== t2;
      function bn(t2, { repeat: e2, repeatType: n2 = "loop" }, i2) {
        const s2 = t2.filter(Tn), o2 = e2 && "loop" !== n2 && e2 % 2 == 1 ? 0 : s2.length - 1;
        return o2 && void 0 !== i2 ? i2 : s2[o2];
      }
      class An {
        constructor({ autoplay: t2 = true, delay: e2 = 0, type: n2 = "keyframes", repeat: i2 = 0, repeatDelay: s2 = 0, repeatType: o2 = "loop", ...r2 }) {
          this.isStopped = false, this.hasAttemptedResolve = false, this.createdAt = dt.now(), this.options = { autoplay: t2, delay: e2, type: n2, repeat: i2, repeatDelay: s2, repeatType: o2, ...r2 }, this.updateFinishedPromise();
        }
        calcStartTime() {
          return this.resolvedAt && this.resolvedAt - this.createdAt > 40 ? this.resolvedAt : this.createdAt;
        }
        get resolved() {
          return this._resolved || this.hasAttemptedResolve || (an(), rn()), this._resolved;
        }
        onKeyframesResolved(t2, e2) {
          this.resolvedAt = dt.now(), this.hasAttemptedResolve = true;
          const { name: n2, type: i2, velocity: s2, delay: o2, onComplete: r2, onUpdate: a2, isGenerator: l2 } = this.options;
          if (!l2 && !Sn(t2, n2, i2, s2)) {
            if (Wt.current || !o2) return a2 && a2(bn(t2, this.options, e2)), r2 && r2(), void this.resolveFinishedPromise();
            this.options.duration = 0;
          }
          const u2 = this.initPlayback(t2, e2);
          false !== u2 && (this._resolved = { keyframes: t2, finalKeyframe: e2, ...u2 }, this.onPostResolved());
        }
        onPostResolved() {
        }
        then(t2, e2) {
          return this.currentFinishedPromise.then(t2, e2);
        }
        flatten() {
          this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear");
        }
        updateFinishedPromise() {
          this.currentFinishedPromise = new Promise((t2) => {
            this.resolveFinishedPromise = t2;
          });
        }
      }
      function En(t2, e2, n2) {
        return n2 < 0 && (n2 += 1), n2 > 1 && (n2 -= 1), n2 < 1 / 6 ? t2 + 6 * (e2 - t2) * n2 : n2 < 0.5 ? e2 : n2 < 2 / 3 ? t2 + (e2 - t2) * (2 / 3 - n2) * 6 : t2;
      }
      function Mn(t2, e2) {
        return (n2) => n2 > 0 ? e2 : t2;
      }
      const Cn = (t2, e2, n2) => {
        const i2 = t2 * t2, s2 = n2 * (e2 * e2 - i2) + i2;
        return s2 < 0 ? 0 : Math.sqrt(s2);
      }, Vn = [pe, de, Pe];
      function Rn(t2) {
        const e2 = (n2 = t2, Vn.find((t3) => t3.test(n2)));
        var n2;
        if (!Boolean(e2)) return false;
        let i2 = e2.parse(t2);
        return e2 === Pe && (i2 = function({ hue: t3, saturation: e3, lightness: n3, alpha: i3 }) {
          t3 /= 360, n3 /= 100;
          let s2 = 0, o2 = 0, r2 = 0;
          if (e3 /= 100) {
            const i4 = n3 < 0.5 ? n3 * (1 + e3) : n3 + e3 - n3 * e3, a2 = 2 * n3 - i4;
            s2 = En(a2, i4, t3 + 1 / 3), o2 = En(a2, i4, t3), r2 = En(a2, i4, t3 - 1 / 3);
          } else s2 = o2 = r2 = n3;
          return { red: Math.round(255 * s2), green: Math.round(255 * o2), blue: Math.round(255 * r2), alpha: i3 };
        }(i2)), i2;
      }
      const Dn = (t2, e2) => {
        const n2 = Rn(t2), i2 = Rn(e2);
        if (!n2 || !i2) return Mn(t2, e2);
        const s2 = { ...n2 };
        return (t3) => (s2.red = Cn(n2.red, i2.red, t3), s2.green = Cn(n2.green, i2.green, t3), s2.blue = Cn(n2.blue, i2.blue, t3), s2.alpha = Rt(n2.alpha, i2.alpha, t3), de.transform(s2));
      }, kn = (t2, e2) => (n2) => e2(t2(n2)), Ln = (...t2) => t2.reduce(kn), Bn = /* @__PURE__ */ new Set(["none", "hidden"]);
      function Fn(t2, e2) {
        return (n2) => Rt(t2, e2, n2);
      }
      function On(t2) {
        return "number" == typeof t2 ? Fn : "string" == typeof t2 ? pn(t2) ? Mn : Se.test(t2) ? Dn : Un : Array.isArray(t2) ? jn : "object" == typeof t2 ? Se.test(t2) ? Dn : In : Mn;
      }
      function jn(t2, e2) {
        const n2 = [...t2], i2 = n2.length, s2 = t2.map((t3, n3) => On(t3)(t3, e2[n3]));
        return (t3) => {
          for (let e3 = 0; e3 < i2; e3++) n2[e3] = s2[e3](t3);
          return n2;
        };
      }
      function In(t2, e2) {
        const n2 = { ...t2, ...e2 }, i2 = {};
        for (const s2 in n2) void 0 !== t2[s2] && void 0 !== e2[s2] && (i2[s2] = On(t2[s2])(t2[s2], e2[s2]));
        return (t3) => {
          for (const e3 in i2) n2[e3] = i2[e3](t3);
          return n2;
        };
      }
      const Un = (t2, e2) => {
        const n2 = Ve.createTransformer(e2), i2 = Ae(t2), s2 = Ae(e2);
        return i2.indexes.var.length === s2.indexes.var.length && i2.indexes.color.length === s2.indexes.color.length && i2.indexes.number.length >= s2.indexes.number.length ? Bn.has(t2) && !s2.values.length || Bn.has(e2) && !i2.values.length ? function(t3, e3) {
          return Bn.has(t3) ? (n3) => n3 <= 0 ? t3 : e3 : (n3) => n3 >= 1 ? e3 : t3;
        }(t2, e2) : Ln(jn(function(t3, e3) {
          var n3;
          const i3 = [], s3 = { color: 0, var: 0, number: 0 };
          for (let o2 = 0; o2 < e3.values.length; o2++) {
            const r2 = e3.types[o2], a2 = t3.indexes[r2][s3[r2]], l2 = null !== (n3 = t3.values[a2]) && void 0 !== n3 ? n3 : 0;
            i3[o2] = l2, s3[r2]++;
          }
          return i3;
        }(i2, s2), s2.values), n2) : Mn(t2, e2);
      };
      function Wn(t2, e2, n2) {
        if ("number" == typeof t2 && "number" == typeof e2 && "number" == typeof n2) return Rt(t2, e2, n2);
        return On(t2)(t2, e2);
      }
      function Nn(t2, e2, n2) {
        const i2 = Math.max(e2 - 5, 0);
        return U(n2 - t2(i2), e2 - i2);
      }
      const zn = 100, $n = 10, Hn = 1, Xn = 0, Yn = 800, Kn = 0.3, Gn = 0.3, _n = { granular: 0.01, default: 2 }, qn = { granular: 5e-3, default: 0.5 }, Zn = 0.01, Jn = 10, Qn = 0.05, ti = 1;
      function ei({ duration: t2 = Yn, bounce: e2 = Kn, velocity: n2 = Xn, mass: i2 = Hn }) {
        let s2, o2, r2 = 1 - e2;
        r2 = ne(Qn, ti, r2), t2 = ne(Zn, Jn, I(t2)), r2 < 1 ? (s2 = (e3) => {
          const i3 = e3 * r2, s3 = i3 * t2;
          return 1e-3 - (i3 - n2) / ni(e3, r2) * Math.exp(-s3);
        }, o2 = (e3) => {
          const i3 = e3 * r2 * t2, o3 = i3 * n2 + n2, a3 = Math.pow(r2, 2) * Math.pow(e3, 2) * t2, l2 = Math.exp(-i3), u2 = ni(Math.pow(e3, 2), r2);
          return (1e-3 - s2(e3) > 0 ? -1 : 1) * ((o3 - a3) * l2) / u2;
        }) : (s2 = (e3) => Math.exp(-e3 * t2) * ((e3 - n2) * t2 + 1) - 1e-3, o2 = (e3) => Math.exp(-e3 * t2) * (t2 * t2 * (n2 - e3)));
        const a2 = function(t3, e3, n3) {
          let i3 = n3;
          for (let n4 = 1; n4 < 12; n4++) i3 -= t3(i3) / e3(i3);
          return i3;
        }(s2, o2, 5 / t2);
        if (t2 = j(t2), isNaN(a2)) return { stiffness: zn, damping: $n, duration: t2 };
        {
          const e3 = Math.pow(a2, 2) * i2;
          return { stiffness: e3, damping: 2 * r2 * Math.sqrt(i2 * e3), duration: t2 };
        }
      }
      function ni(t2, e2) {
        return t2 * Math.sqrt(1 - e2 * e2);
      }
      const ii = ["duration", "bounce"], si = ["stiffness", "damping", "mass"];
      function oi(t2, e2) {
        return e2.some((e3) => void 0 !== t2[e3]);
      }
      function ri(t2 = Gn, e2 = Kn) {
        const n2 = "object" != typeof t2 ? { visualDuration: t2, keyframes: [0, 1], bounce: e2 } : t2;
        let { restSpeed: i2, restDelta: s2 } = n2;
        const o2 = n2.keyframes[0], r2 = n2.keyframes[n2.keyframes.length - 1], a2 = { done: false, value: o2 }, { stiffness: l2, damping: u2, mass: c2, duration: h2, velocity: d2, isResolvedFromDuration: p2 } = function(t3) {
          let e3 = { velocity: Xn, stiffness: zn, damping: $n, mass: Hn, isResolvedFromDuration: false, ...t3 };
          if (!oi(t3, si) && oi(t3, ii)) if (t3.visualDuration) {
            const n3 = t3.visualDuration, i3 = 2 * Math.PI / (1.2 * n3), s3 = i3 * i3, o3 = 2 * ne(0.05, 1, 1 - (t3.bounce || 0)) * Math.sqrt(s3);
            e3 = { ...e3, mass: Hn, stiffness: s3, damping: o3 };
          } else {
            const n3 = ei(t3);
            e3 = { ...e3, ...n3, mass: Hn }, e3.isResolvedFromDuration = true;
          }
          return e3;
        }({ ...n2, velocity: -I(n2.velocity || 0) }), m2 = d2 || 0, f2 = u2 / (2 * Math.sqrt(l2 * c2)), g2 = r2 - o2, y2 = I(Math.sqrt(l2 / c2)), v2 = Math.abs(g2) < 5;
        let x2;
        if (i2 || (i2 = v2 ? _n.granular : _n.default), s2 || (s2 = v2 ? qn.granular : qn.default), f2 < 1) {
          const t3 = ni(y2, f2);
          x2 = (e3) => {
            const n3 = Math.exp(-f2 * y2 * e3);
            return r2 - n3 * ((m2 + f2 * y2 * g2) / t3 * Math.sin(t3 * e3) + g2 * Math.cos(t3 * e3));
          };
        } else if (1 === f2) x2 = (t3) => r2 - Math.exp(-y2 * t3) * (g2 + (m2 + y2 * g2) * t3);
        else {
          const t3 = y2 * Math.sqrt(f2 * f2 - 1);
          x2 = (e3) => {
            const n3 = Math.exp(-f2 * y2 * e3), i3 = Math.min(t3 * e3, 300);
            return r2 - n3 * ((m2 + f2 * y2 * g2) * Math.sinh(i3) + t3 * g2 * Math.cosh(i3)) / t3;
          };
        }
        const w2 = { calculatedDuration: p2 && h2 || null, next: (t3) => {
          const e3 = x2(t3);
          if (p2) a2.done = t3 >= h2;
          else {
            let n3 = 0;
            f2 < 1 && (n3 = 0 === t3 ? j(m2) : Nn(x2, t3, e3));
            const o3 = Math.abs(n3) <= i2, l3 = Math.abs(r2 - e3) <= s2;
            a2.done = o3 && l3;
          }
          return a2.value = a2.done ? r2 : e3, a2;
        }, toString: () => {
          const t3 = Math.min($(w2), 2e4), e3 = Z((e4) => w2.next(t3 * e4).value, t3, 30);
          return t3 + "ms " + e3;
        } };
        return w2;
      }
      function ai({ keyframes: t2, velocity: e2 = 0, power: n2 = 0.8, timeConstant: i2 = 325, bounceDamping: s2 = 10, bounceStiffness: o2 = 500, modifyTarget: r2, min: a2, max: l2, restDelta: u2 = 0.5, restSpeed: c2 }) {
        const h2 = t2[0], d2 = { done: false, value: h2 }, p2 = (t3) => void 0 === a2 ? l2 : void 0 === l2 || Math.abs(a2 - t3) < Math.abs(l2 - t3) ? a2 : l2;
        let m2 = n2 * e2;
        const f2 = h2 + m2, g2 = void 0 === r2 ? f2 : r2(f2);
        g2 !== f2 && (m2 = g2 - h2);
        const y2 = (t3) => -m2 * Math.exp(-t3 / i2), v2 = (t3) => g2 + y2(t3), x2 = (t3) => {
          const e3 = y2(t3), n3 = v2(t3);
          d2.done = Math.abs(e3) <= u2, d2.value = d2.done ? g2 : n3;
        };
        let w2, P2;
        const S2 = (t3) => {
          var e3;
          (e3 = d2.value, void 0 !== a2 && e3 < a2 || void 0 !== l2 && e3 > l2) && (w2 = t3, P2 = ri({ keyframes: [d2.value, p2(d2.value)], velocity: Nn(v2, t3, d2.value), damping: s2, stiffness: o2, restDelta: u2, restSpeed: c2 }));
        };
        return S2(0), { calculatedDuration: null, next: (t3) => {
          let e3 = false;
          return P2 || void 0 !== w2 || (e3 = true, x2(t3), S2(t3)), void 0 !== w2 && t3 >= w2 ? P2.next(t3 - w2) : (!e3 && x2(t3), d2);
        } };
      }
      const li = zt(0.42, 0, 1, 1), ui = zt(0, 0, 0.58, 1), ci = zt(0.42, 0, 0.58, 1), hi = (t2) => Array.isArray(t2) && "number" != typeof t2[0], di = { linear: R, easeIn: li, easeInOut: ci, easeOut: ui, circIn: _t, circInOut: Zt, circOut: qt, backIn: Yt, backInOut: Kt, backOut: Xt, anticipate: Gt }, pi = (t2) => {
        if (K(t2)) {
          k(4 === t2.length);
          const [e2, n2, i2, s2] = t2;
          return zt(e2, n2, i2, s2);
        }
        return "string" == typeof t2 ? di[t2] : t2;
      };
      function mi(t2, e2, { clamp: n2 = true, ease: i2, mixer: s2 } = {}) {
        const o2 = t2.length;
        if (k(o2 === e2.length), 1 === o2) return () => e2[0];
        if (2 === o2 && e2[0] === e2[1]) return () => e2[1];
        const r2 = t2[0] === t2[1];
        t2[0] > t2[o2 - 1] && (t2 = [...t2].reverse(), e2 = [...e2].reverse());
        const a2 = function(t3, e3, n3) {
          const i3 = [], s3 = n3 || Wn, o3 = t3.length - 1;
          for (let n4 = 0; n4 < o3; n4++) {
            let o4 = s3(t3[n4], t3[n4 + 1]);
            if (e3) {
              const t4 = Array.isArray(e3) ? e3[n4] || R : e3;
              o4 = Ln(t4, o4);
            }
            i3.push(o4);
          }
          return i3;
        }(e2, i2, s2), l2 = a2.length, u2 = (n3) => {
          if (r2 && n3 < t2[0]) return e2[0];
          let i3 = 0;
          if (l2 > 1) for (; i3 < t2.length - 2 && !(n3 < t2[i3 + 1]); i3++) ;
          const s3 = F(t2[i3], t2[i3 + 1], n3);
          return a2[i3](s3);
        };
        return n2 ? (e3) => u2(ne(t2[0], t2[o2 - 1], e3)) : u2;
      }
      function fi(t2, e2) {
        const n2 = t2[t2.length - 1];
        for (let i2 = 1; i2 <= e2; i2++) {
          const s2 = F(0, e2, i2);
          t2.push(Rt(n2, 1, s2));
        }
      }
      function gi(t2) {
        const e2 = [0];
        return fi(e2, t2.length - 1), e2;
      }
      function yi({ duration: t2 = 300, keyframes: e2, times: n2, ease: i2 = "easeInOut" }) {
        const s2 = hi(i2) ? i2.map(pi) : pi(i2), o2 = { done: false, value: e2[0] }, r2 = mi(function(t3, e3) {
          return t3.map((t4) => t4 * e3);
        }(n2 && n2.length === e2.length ? n2 : gi(e2), t2), e2, { ease: Array.isArray(s2) ? s2 : (a2 = e2, l2 = s2, a2.map(() => l2 || ci).splice(0, a2.length - 1)) });
        var a2, l2;
        return { calculatedDuration: t2, next: (e3) => (o2.value = r2(e3), o2.done = e3 >= t2, o2) };
      }
      const vi = (t2) => {
        const e2 = ({ timestamp: e3 }) => t2(e3);
        return { start: () => st.update(e2, true), stop: () => ot(e2), now: () => rt.isProcessing ? rt.timestamp : dt.now() };
      }, xi = { decay: ai, inertia: ai, tween: yi, keyframes: yi, spring: ri }, wi = (t2) => t2 / 100;
      class Pi extends An {
        constructor(t2) {
          super(t2), this.holdTime = null, this.cancelTime = null, this.currentTime = 0, this.playbackSpeed = 1, this.pendingPlayState = "running", this.startTime = null, this.state = "idle", this.stop = () => {
            if (this.resolver.cancel(), this.isStopped = true, "idle" === this.state) return;
            this.teardown();
            const { onStop: t3 } = this.options;
            t3 && t3();
          };
          const { name: e2, motionValue: n2, element: i2, keyframes: s2 } = this.options, o2 = (null == i2 ? void 0 : i2.KeyframeResolver) || ln;
          this.resolver = new o2(s2, (t3, e3) => this.onKeyframesResolved(t3, e3), e2, n2, i2), this.resolver.scheduleResolve();
        }
        flatten() {
          super.flatten(), this._resolved && Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes));
        }
        initPlayback(t2) {
          const { type: e2 = "keyframes", repeat: n2 = 0, repeatDelay: i2 = 0, repeatType: s2, velocity: o2 = 0 } = this.options, r2 = X(e2) ? e2 : xi[e2] || yi;
          let a2, l2;
          r2 !== yi && "number" != typeof t2[0] && (a2 = Ln(wi, Wn(t2[0], t2[1])), t2 = [0, 100]);
          const u2 = r2({ ...this.options, keyframes: t2 });
          "mirror" === s2 && (l2 = r2({ ...this.options, keyframes: [...t2].reverse(), velocity: -o2 })), null === u2.calculatedDuration && (u2.calculatedDuration = $(u2));
          const { calculatedDuration: c2 } = u2, h2 = c2 + i2;
          return { generator: u2, mirroredGenerator: l2, mapPercentToKeyframes: a2, calculatedDuration: c2, resolvedDuration: h2, totalDuration: h2 * (n2 + 1) - i2 };
        }
        onPostResolved() {
          const { autoplay: t2 = true } = this.options;
          this.play(), "paused" !== this.pendingPlayState && t2 ? this.state = this.pendingPlayState : this.pause();
        }
        tick(t2, e2 = false) {
          const { resolved: n2 } = this;
          if (!n2) {
            const { keyframes: t3 } = this.options;
            return { done: true, value: t3[t3.length - 1] };
          }
          const { finalKeyframe: i2, generator: s2, mirroredGenerator: o2, mapPercentToKeyframes: r2, keyframes: a2, calculatedDuration: l2, totalDuration: u2, resolvedDuration: c2 } = n2;
          if (null === this.startTime) return s2.next(0);
          const { delay: h2, repeat: d2, repeatType: p2, repeatDelay: m2, onUpdate: f2 } = this.options;
          this.speed > 0 ? this.startTime = Math.min(this.startTime, t2) : this.speed < 0 && (this.startTime = Math.min(t2 - u2 / this.speed, this.startTime)), e2 ? this.currentTime = t2 : null !== this.holdTime ? this.currentTime = this.holdTime : this.currentTime = Math.round(t2 - this.startTime) * this.speed;
          const g2 = this.currentTime - h2 * (this.speed >= 0 ? 1 : -1), y2 = this.speed >= 0 ? g2 < 0 : g2 > u2;
          this.currentTime = Math.max(g2, 0), "finished" === this.state && null === this.holdTime && (this.currentTime = u2);
          let v2 = this.currentTime, x2 = s2;
          if (d2) {
            const t3 = Math.min(this.currentTime, u2) / c2;
            let e3 = Math.floor(t3), n3 = t3 % 1;
            !n3 && t3 >= 1 && (n3 = 1), 1 === n3 && e3--, e3 = Math.min(e3, d2 + 1);
            Boolean(e3 % 2) && ("reverse" === p2 ? (n3 = 1 - n3, m2 && (n3 -= m2 / c2)) : "mirror" === p2 && (x2 = o2)), v2 = ne(0, 1, n3) * c2;
          }
          const w2 = y2 ? { done: false, value: a2[0] } : x2.next(v2);
          r2 && (w2.value = r2(w2.value));
          let { done: P2 } = w2;
          y2 || null === l2 || (P2 = this.speed >= 0 ? this.currentTime >= u2 : this.currentTime <= 0);
          const S2 = null === this.holdTime && ("finished" === this.state || "running" === this.state && P2);
          return S2 && void 0 !== i2 && (w2.value = bn(a2, this.options, i2)), f2 && f2(w2.value), S2 && this.finish(), w2;
        }
        get duration() {
          const { resolved: t2 } = this;
          return t2 ? I(t2.calculatedDuration) : 0;
        }
        get time() {
          return I(this.currentTime);
        }
        set time(t2) {
          t2 = j(t2), this.currentTime = t2, null !== this.holdTime || 0 === this.speed ? this.holdTime = t2 : this.driver && (this.startTime = this.driver.now() - t2 / this.speed);
        }
        get speed() {
          return this.playbackSpeed;
        }
        set speed(t2) {
          const e2 = this.playbackSpeed !== t2;
          this.playbackSpeed = t2, e2 && (this.time = I(this.currentTime));
        }
        play() {
          if (this.resolver.isScheduled || this.resolver.resume(), !this._resolved) return void (this.pendingPlayState = "running");
          if (this.isStopped) return;
          const { driver: t2 = vi, onPlay: e2, startTime: n2 } = this.options;
          this.driver || (this.driver = t2((t3) => this.tick(t3))), e2 && e2();
          const i2 = this.driver.now();
          null !== this.holdTime ? this.startTime = i2 - this.holdTime : this.startTime ? "finished" === this.state && (this.startTime = i2) : this.startTime = null != n2 ? n2 : this.calcStartTime(), "finished" === this.state && this.updateFinishedPromise(), this.cancelTime = this.startTime, this.holdTime = null, this.state = "running", this.driver.start();
        }
        pause() {
          var t2;
          this._resolved ? (this.state = "paused", this.holdTime = null !== (t2 = this.currentTime) && void 0 !== t2 ? t2 : 0) : this.pendingPlayState = "paused";
        }
        complete() {
          "running" !== this.state && this.play(), this.pendingPlayState = this.state = "finished", this.holdTime = null;
        }
        finish() {
          this.teardown(), this.state = "finished";
          const { onComplete: t2 } = this.options;
          t2 && t2();
        }
        cancel() {
          null !== this.cancelTime && this.tick(this.cancelTime), this.teardown(), this.updateFinishedPromise();
        }
        teardown() {
          this.state = "idle", this.stopDriver(), this.resolveFinishedPromise(), this.updateFinishedPromise(), this.startTime = this.cancelTime = null, this.resolver.cancel();
        }
        stopDriver() {
          this.driver && (this.driver.stop(), this.driver = void 0);
        }
        sample(t2) {
          return this.startTime = 0, this.tick(t2, true);
        }
      }
      function Si(t2) {
        return new Pi(t2);
      }
      const Ti = /* @__PURE__ */ new Set(["opacity", "clipPath", "filter", "transform"]);
      function bi(t2, e2, n2, { delay: i2 = 0, duration: s2 = 300, repeat: o2 = 0, repeatType: r2 = "loop", ease: a2 = "easeInOut", times: l2 } = {}) {
        const u2 = { [e2]: n2 };
        l2 && (u2.offset = l2);
        const c2 = function t3(e3, n3) {
          return e3 ? "function" == typeof e3 && q() ? Z(e3, n3) : K(e3) ? Q(e3) : Array.isArray(e3) ? e3.map((e4) => t3(e4, n3) || tt.easeOut) : tt[e3] : void 0;
        }(a2, s2);
        Array.isArray(c2) && (u2.easing = c2);
        return t2.animate(u2, { delay: i2, duration: s2, easing: Array.isArray(c2) ? "linear" : c2, fill: "both", iterations: o2 + 1, direction: "reverse" === r2 ? "alternate" : "normal" });
      }
      const Ai = B(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
      const Ei = { anticipate: Gt, backInOut: Kt, circInOut: Zt };
      class Mi extends An {
        constructor(t2) {
          super(t2);
          const { name: e2, motionValue: n2, element: i2, keyframes: s2 } = this.options;
          this.resolver = new wn(s2, (t3, e3) => this.onKeyframesResolved(t3, e3), e2, n2, i2), this.resolver.scheduleResolve();
        }
        initPlayback(t2, e2) {
          let { duration: n2 = 300, times: i2, ease: s2, type: o2, motionValue: r2, name: a2, startTime: l2 } = this.options;
          if (!r2.owner || !r2.owner.current) return false;
          var u2;
          if ("string" == typeof s2 && q() && s2 in Ei && (s2 = Ei[s2]), X((u2 = this.options).type) || "spring" === u2.type || !J(u2.ease)) {
            const { onComplete: e3, onUpdate: r3, motionValue: a3, element: l3, ...u3 } = this.options, c3 = function(t3, e4) {
              const n3 = new Pi({ ...e4, keyframes: t3, repeat: 0, delay: 0, isGenerator: true });
              let i3 = { done: false, value: t3[0] };
              const s3 = [];
              let o3 = 0;
              for (; !i3.done && o3 < 2e4; ) i3 = n3.sample(o3), s3.push(i3.value), o3 += 10;
              return { times: void 0, keyframes: s3, duration: o3 - 10, ease: "linear" };
            }(t2, u3);
            1 === (t2 = c3.keyframes).length && (t2[1] = t2[0]), n2 = c3.duration, i2 = c3.times, s2 = c3.ease, o2 = "keyframes";
          }
          const c2 = bi(r2.owner.current, a2, t2, { ...this.options, duration: n2, times: i2, ease: s2 });
          return c2.startTime = null != l2 ? l2 : this.calcStartTime(), this.pendingTimeline ? (Y(c2, this.pendingTimeline), this.pendingTimeline = void 0) : c2.onfinish = () => {
            const { onComplete: n3 } = this.options;
            r2.set(bn(t2, this.options, e2)), n3 && n3(), this.cancel(), this.resolveFinishedPromise();
          }, { animation: c2, duration: n2, times: i2, type: o2, ease: s2, keyframes: t2 };
        }
        get duration() {
          const { resolved: t2 } = this;
          if (!t2) return 0;
          const { duration: e2 } = t2;
          return I(e2);
        }
        get time() {
          const { resolved: t2 } = this;
          if (!t2) return 0;
          const { animation: e2 } = t2;
          return I(e2.currentTime || 0);
        }
        set time(t2) {
          const { resolved: e2 } = this;
          if (!e2) return;
          const { animation: n2 } = e2;
          n2.currentTime = j(t2);
        }
        get speed() {
          const { resolved: t2 } = this;
          if (!t2) return 1;
          const { animation: e2 } = t2;
          return e2.playbackRate;
        }
        set speed(t2) {
          const { resolved: e2 } = this;
          if (!e2) return;
          const { animation: n2 } = e2;
          n2.playbackRate = t2;
        }
        get state() {
          const { resolved: t2 } = this;
          if (!t2) return "idle";
          const { animation: e2 } = t2;
          return e2.playState;
        }
        get startTime() {
          const { resolved: t2 } = this;
          if (!t2) return null;
          const { animation: e2 } = t2;
          return e2.startTime;
        }
        attachTimeline(t2) {
          if (this._resolved) {
            const { resolved: e2 } = this;
            if (!e2) return R;
            const { animation: n2 } = e2;
            Y(n2, t2);
          } else this.pendingTimeline = t2;
          return R;
        }
        play() {
          if (this.isStopped) return;
          const { resolved: t2 } = this;
          if (!t2) return;
          const { animation: e2 } = t2;
          "finished" === e2.playState && this.updateFinishedPromise(), e2.play();
        }
        pause() {
          const { resolved: t2 } = this;
          if (!t2) return;
          const { animation: e2 } = t2;
          e2.pause();
        }
        stop() {
          if (this.resolver.cancel(), this.isStopped = true, "idle" === this.state) return;
          this.resolveFinishedPromise(), this.updateFinishedPromise();
          const { resolved: t2 } = this;
          if (!t2) return;
          const { animation: e2, keyframes: n2, duration: i2, type: s2, ease: o2, times: r2 } = t2;
          if ("idle" === e2.playState || "finished" === e2.playState) return;
          if (this.time) {
            const { motionValue: t3, onUpdate: e3, onComplete: a3, element: l2, ...u2 } = this.options, c2 = new Pi({ ...u2, keyframes: n2, duration: i2, type: s2, ease: o2, times: r2, isGenerator: true }), h2 = j(this.time);
            t3.setWithVelocity(c2.sample(h2 - 10).value, c2.sample(h2).value, 10);
          }
          const { onStop: a2 } = this.options;
          a2 && a2(), this.cancel();
        }
        complete() {
          const { resolved: t2 } = this;
          t2 && t2.animation.finish();
        }
        cancel() {
          const { resolved: t2 } = this;
          t2 && t2.animation.cancel();
        }
        static supports(t2) {
          const { motionValue: e2, name: n2, repeatDelay: i2, repeatType: s2, damping: o2, type: r2 } = t2;
          if (!(e2 && e2.owner && e2.owner.current instanceof HTMLElement)) return false;
          const { onUpdate: a2, transformTemplate: l2 } = e2.owner.getProps();
          return Ai() && n2 && Ti.has(n2) && ("transform" !== n2 || !l2) && !a2 && !i2 && "mirror" !== s2 && 0 !== o2 && "inertia" !== r2;
        }
      }
      const Ci = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 }, Vi = { type: "keyframes", duration: 0.8 }, Ri = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 }, Di = (t2, { keyframes: e2 }) => e2.length > 2 ? Vi : te.has(t2) ? t2.startsWith("scale") ? { type: "spring", stiffness: 550, damping: 0 === e2[1] ? 2 * Math.sqrt(550) : 30, restSpeed: 10 } : Ci : Ri;
      const ki = (t2, e2, n2, i2 = {}, s2, o2) => (r2) => {
        const a2 = z(i2, t2) || {}, l2 = a2.delay || i2.delay || 0;
        let { elapsed: u2 = 0 } = i2;
        u2 -= j(l2);
        let c2 = { keyframes: Array.isArray(n2) ? n2 : [null, n2], ease: "easeOut", velocity: e2.getVelocity(), ...a2, delay: -u2, onUpdate: (t3) => {
          e2.set(t3), a2.onUpdate && a2.onUpdate(t3);
        }, onComplete: () => {
          r2(), a2.onComplete && a2.onComplete();
        }, name: t2, motionValue: e2, element: o2 ? void 0 : s2 };
        (function({ when: t3, delay: e3, delayChildren: n3, staggerChildren: i3, staggerDirection: s3, repeat: o3, repeatType: r3, repeatDelay: a3, from: l3, elapsed: u3, ...c3 }) {
          return !!Object.keys(c3).length;
        })(a2) || (c2 = { ...c2, ...Di(t2, c2) }), c2.duration && (c2.duration = j(c2.duration)), c2.repeatDelay && (c2.repeatDelay = j(c2.repeatDelay)), void 0 !== c2.from && (c2.keyframes[0] = c2.from);
        let h2 = false;
        if ((false === c2.type || 0 === c2.duration && !c2.repeatDelay) && (c2.duration = 0, 0 === c2.delay && (h2 = true)), (Wt.current || L.skipAnimations) && (h2 = true, c2.duration = 0, c2.delay = 0), c2.allowFlatten = !a2.type && !a2.ease, h2 && !o2 && void 0 !== e2.get()) {
          const t3 = bn(c2.keyframes, a2);
          if (void 0 !== t3) return st.update(() => {
            c2.onUpdate(t3), c2.onComplete();
          }), new N([]);
        }
        return !o2 && Mi.supports(c2) ? new Mi(c2) : new Pi(c2);
      };
      function Li(t2, e2, n2) {
        const i2 = Ut(t2) ? t2 : Vt(t2);
        return i2.start(ki("", i2, e2, n2)), i2.animation;
      }
      const Bi = (t2) => t2.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), Fi = "data-" + Bi("framerAppearId");
      function Oi(t2) {
        return t2.props[Fi];
      }
      function ji(t2) {
        return t2 instanceof SVGElement && "svg" !== t2.tagName;
      }
      const Ii = (t2, e2) => t2.depth - e2.depth;
      class Ui {
        constructor() {
          this.children = [], this.isDirty = false;
        }
        add(t2) {
          C(this.children, t2), this.isDirty = true;
        }
        remove(t2) {
          V(this.children, t2), this.isDirty = true;
        }
        forEach(t2) {
          this.isDirty && this.children.sort(Ii), this.isDirty = false, this.children.forEach(t2);
        }
      }
      function Wi(t2, e2) {
        const n2 = dt.now(), i2 = ({ timestamp: s2 }) => {
          const o2 = s2 - n2;
          o2 >= e2 && (ot(i2), t2(o2 - e2));
        };
        return st.read(i2, true), () => ot(i2);
      }
      const Ni = (t2) => Array.isArray(t2);
      function zi(t2) {
        const e2 = Ut(t2) ? t2.get() : t2;
        return n2 = e2, Boolean(n2 && "object" == typeof n2 && n2.mix && n2.toValue) ? e2.toValue() : e2;
        var n2;
      }
      const $i = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], Hi = $i.length, Xi = (t2) => "string" == typeof t2 ? parseFloat(t2) : t2, Yi = (t2) => "number" == typeof t2 || ye.test(t2);
      function Ki(t2, e2) {
        return void 0 !== t2[e2] ? t2[e2] : t2.borderRadius;
      }
      const Gi = qi(0, 0.5, qt), _i = qi(0.5, 0.95, R);
      function qi(t2, e2, n2) {
        return (i2) => i2 < t2 ? 0 : i2 > e2 ? 1 : n2(F(t2, e2, i2));
      }
      function Zi(t2, e2) {
        t2.min = e2.min, t2.max = e2.max;
      }
      function Ji(t2, e2) {
        Zi(t2.x, e2.x), Zi(t2.y, e2.y);
      }
      function Qi(t2, e2) {
        t2.translate = e2.translate, t2.scale = e2.scale, t2.originPoint = e2.originPoint, t2.origin = e2.origin;
      }
      function ts(t2) {
        return void 0 === t2 || 1 === t2;
      }
      function es({ scale: t2, scaleX: e2, scaleY: n2 }) {
        return !ts(t2) || !ts(e2) || !ts(n2);
      }
      function ns(t2) {
        return es(t2) || is(t2) || t2.z || t2.rotate || t2.rotateX || t2.rotateY || t2.skewX || t2.skewY;
      }
      function is(t2) {
        return ss(t2.x) || ss(t2.y);
      }
      function ss(t2) {
        return t2 && "0%" !== t2;
      }
      function os(t2, e2, n2) {
        return n2 + e2 * (t2 - n2);
      }
      function rs(t2, e2, n2, i2, s2) {
        return void 0 !== s2 && (t2 = os(t2, s2, i2)), os(t2, n2, i2) + e2;
      }
      function as(t2, e2 = 0, n2 = 1, i2, s2) {
        t2.min = rs(t2.min, e2, n2, i2, s2), t2.max = rs(t2.max, e2, n2, i2, s2);
      }
      function ls(t2, { x: e2, y: n2 }) {
        as(t2.x, e2.translate, e2.scale, e2.originPoint), as(t2.y, n2.translate, n2.scale, n2.originPoint);
      }
      function us(t2, e2) {
        t2.min = t2.min + e2, t2.max = t2.max + e2;
      }
      function cs(t2, e2, n2, i2, s2 = 0.5) {
        as(t2, e2, n2, Rt(t2.min, t2.max, s2), i2);
      }
      function hs(t2, e2) {
        cs(t2.x, e2.x, e2.scaleX, e2.scale, e2.originX), cs(t2.y, e2.y, e2.scaleY, e2.scale, e2.originY);
      }
      function ds(t2, e2, n2, i2, s2) {
        return t2 = os(t2 -= e2, 1 / n2, i2), void 0 !== s2 && (t2 = os(t2, 1 / s2, i2)), t2;
      }
      function ps(t2, e2, [n2, i2, s2], o2, r2) {
        !function(t3, e3 = 0, n3 = 1, i3 = 0.5, s3, o3 = t3, r3 = t3) {
          if (ge.test(e3)) {
            e3 = parseFloat(e3);
            e3 = Rt(r3.min, r3.max, e3 / 100) - r3.min;
          }
          if ("number" != typeof e3) return;
          let a2 = Rt(o3.min, o3.max, i3);
          t3 === o3 && (a2 -= e3), t3.min = ds(t3.min, e3, n3, a2, s3), t3.max = ds(t3.max, e3, n3, a2, s3);
        }(t2, e2[n2], e2[i2], e2[s2], e2.scale, o2, r2);
      }
      const ms = ["x", "scaleX", "originX"], fs = ["y", "scaleY", "originY"];
      function gs(t2, e2, n2, i2) {
        ps(t2.x, e2, ms, n2 ? n2.x : void 0, i2 ? i2.x : void 0), ps(t2.y, e2, fs, n2 ? n2.y : void 0, i2 ? i2.y : void 0);
      }
      const ys = () => ({ x: { min: 0, max: 0 }, y: { min: 0, max: 0 } });
      function vs(t2) {
        return 0 === t2.translate && 1 === t2.scale;
      }
      function xs(t2) {
        return vs(t2.x) && vs(t2.y);
      }
      function ws(t2, e2) {
        return t2.min === e2.min && t2.max === e2.max;
      }
      function Ps(t2, e2) {
        return Math.round(t2.min) === Math.round(e2.min) && Math.round(t2.max) === Math.round(e2.max);
      }
      function Ss(t2, e2) {
        return Ps(t2.x, e2.x) && Ps(t2.y, e2.y);
      }
      function Ts(t2) {
        return Dt(t2.x) / Dt(t2.y);
      }
      function bs(t2, e2) {
        return t2.translate === e2.translate && t2.scale === e2.scale && t2.originPoint === e2.originPoint;
      }
      class As {
        constructor() {
          this.members = [];
        }
        add(t2) {
          C(this.members, t2), t2.scheduleRender();
        }
        remove(t2) {
          if (V(this.members, t2), t2 === this.prevLead && (this.prevLead = void 0), t2 === this.lead) {
            const t3 = this.members[this.members.length - 1];
            t3 && this.promote(t3);
          }
        }
        relegate(t2) {
          const e2 = this.members.findIndex((e3) => t2 === e3);
          if (0 === e2) return false;
          let n2;
          for (let t3 = e2; t3 >= 0; t3--) {
            const e3 = this.members[t3];
            if (false !== e3.isPresent) {
              n2 = e3;
              break;
            }
          }
          return !!n2 && (this.promote(n2), true);
        }
        promote(t2, e2) {
          const n2 = this.lead;
          if (t2 !== n2 && (this.prevLead = n2, this.lead = t2, t2.show(), n2)) {
            n2.instance && n2.scheduleRender(), t2.scheduleRender(), t2.resumeFrom = n2, e2 && (t2.resumeFrom.preserveOpacity = true), n2.snapshot && (t2.snapshot = n2.snapshot, t2.snapshot.latestValues = n2.animationValues || n2.latestValues), t2.root && t2.root.isUpdating && (t2.isLayoutDirty = true);
            const { crossfade: i2 } = t2.options;
            false === i2 && n2.hide();
          }
        }
        exitAnimationComplete() {
          this.members.forEach((t2) => {
            const { options: e2, resumingFrom: n2 } = t2;
            e2.onExitComplete && e2.onExitComplete(), n2 && n2.options.onExitComplete && n2.options.onExitComplete();
          });
        }
        scheduleRender() {
          this.members.forEach((t2) => {
            t2.instance && t2.scheduleRender(false);
          });
        }
        removeLeadSnapshot() {
          this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
        }
      }
      const Es = {};
      function Ms(t2) {
        for (const e2 in t2) Es[e2] = t2[e2], hn(e2) && (Es[e2].isCSSVariable = true);
      }
      function Cs(t2) {
        return [t2("x"), t2("y")];
      }
      const Vs = { hasAnimatedSinceResize: true, hasEverUpdated: false }, Rs = ["", "X", "Y", "Z"], Ds = { visibility: "hidden" };
      let ks = 0;
      function Ls(t2, e2, n2, i2) {
        const { latestValues: s2 } = e2;
        s2[t2] && (n2[t2] = s2[t2], e2.setStaticValue(t2, 0), i2 && (i2[t2] = 0));
      }
      function Bs({ attachResizeListener: t2, defaultParent: e2, measureScroll: n2, checkIsScrollRoot: i2, resetTransform: s2 }) {
        return class {
          constructor(t3 = {}, n3 = null == e2 ? void 0 : e2()) {
            this.id = ks++, this.animationId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = false, this.isAnimationBlocked = false, this.isLayoutDirty = false, this.isProjectionDirty = false, this.isSharedProjectionDirty = false, this.isTransformDirty = false, this.updateManuallyBlocked = false, this.updateBlockedByResize = false, this.isUpdating = false, this.isSVG = false, this.needsReset = false, this.shouldResetTransform = false, this.hasCheckedOptimisedAppear = false, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = false, this.updateScheduled = false, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = false, this.checkUpdateFailed = () => {
              this.isUpdating && (this.isUpdating = false, this.clearAllSnapshots());
            }, this.updateProjection = () => {
              this.projectionUpdateScheduled = false, this.nodes.forEach(js), this.nodes.forEach(Hs), this.nodes.forEach(Xs), this.nodes.forEach(Is);
            }, this.resolvedRelativeTargetAt = 0, this.hasProjected = false, this.isVisible = true, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = t3, this.root = n3 ? n3.root || n3 : this, this.path = n3 ? [...n3.path, n3] : [], this.parent = n3, this.depth = n3 ? n3.depth + 1 : 0;
            for (let t4 = 0; t4 < this.path.length; t4++) this.path[t4].shouldResetTransform = true;
            this.root === this && (this.nodes = new Ui());
          }
          addEventListener(t3, e3) {
            return this.eventHandlers.has(t3) || this.eventHandlers.set(t3, new O()), this.eventHandlers.get(t3).add(e3);
          }
          notifyListeners(t3, ...e3) {
            const n3 = this.eventHandlers.get(t3);
            n3 && n3.notify(...e3);
          }
          hasListeners(t3) {
            return this.eventHandlers.has(t3);
          }
          mount(e3, n3 = this.root.hasTreeAnimated) {
            if (this.instance) return;
            this.isSVG = ji(e3), this.instance = e3;
            const { layoutId: i3, layout: s3, visualElement: o2 } = this.options;
            if (o2 && !o2.current && o2.mount(e3), this.root.nodes.add(this), this.parent && this.parent.children.add(this), n3 && (s3 || i3) && (this.isLayoutDirty = true), t2) {
              let n4;
              const i4 = () => this.root.updateBlockedByResize = false;
              t2(e3, () => {
                this.root.updateBlockedByResize = true, n4 && n4(), n4 = Wi(i4, 250), Vs.hasAnimatedSinceResize && (Vs.hasAnimatedSinceResize = false, this.nodes.forEach($s));
              });
            }
            i3 && this.root.registerSharedNode(i3, this), false !== this.options.animate && o2 && (i3 || s3) && this.addEventListener("didUpdate", ({ delta: t3, hasLayoutChanged: e4, hasRelativeLayoutChanged: n4, layout: i4 }) => {
              if (this.isTreeAnimationBlocked()) return this.target = void 0, void (this.relativeTarget = void 0);
              const s4 = this.options.transition || o2.getDefaultTransition() || Zs, { onLayoutAnimationStart: r2, onLayoutAnimationComplete: a2 } = o2.getProps(), l2 = !this.targetLayout || !Ss(this.targetLayout, i4), u2 = !e4 && n4;
              if (this.options.layoutRoot || this.resumeFrom || u2 || e4 && (l2 || !this.currentAnimation)) {
                this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0), this.setAnimationOrigin(t3, u2);
                const e5 = { ...z(s4, "layout"), onPlay: r2, onComplete: a2 };
                (o2.shouldReduceMotion || this.options.layoutRoot) && (e5.delay = 0, e5.type = false), this.startAnimation(e5);
              } else e4 || $s(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
              this.targetLayout = i4;
            });
          }
          unmount() {
            this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
            const t3 = this.getStack();
            t3 && t3.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, ot(this.updateProjection);
          }
          blockUpdate() {
            this.updateManuallyBlocked = true;
          }
          unblockUpdate() {
            this.updateManuallyBlocked = false;
          }
          isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize;
          }
          isTreeAnimationBlocked() {
            return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
          }
          startUpdate() {
            this.isUpdateBlocked() || (this.isUpdating = true, this.nodes && this.nodes.forEach(Ys), this.animationId++);
          }
          getTransformTemplate() {
            const { visualElement: t3 } = this.options;
            return t3 && t3.getProps().transformTemplate;
          }
          willUpdate(t3 = true) {
            if (this.root.hasTreeAnimated = true, this.root.isUpdateBlocked()) return void (this.options.onExitComplete && this.options.onExitComplete());
            if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && function t4(e4) {
              if (e4.hasCheckedOptimisedAppear = true, e4.root === e4) return;
              const { visualElement: n4 } = e4.options;
              if (!n4) return;
              const i4 = Oi(n4);
              if (window.MotionHasOptimisedAnimation(i4, "transform")) {
                const { layout: t5, layoutId: n5 } = e4.options;
                window.MotionCancelOptimisedAnimation(i4, "transform", st, !(t5 || n5));
              }
              const { parent: s3 } = e4;
              s3 && !s3.hasCheckedOptimisedAppear && t4(s3);
            }(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty) return;
            this.isLayoutDirty = true;
            for (let t4 = 0; t4 < this.path.length; t4++) {
              const e4 = this.path[t4];
              e4.shouldResetTransform = true, e4.updateScroll("snapshot"), e4.options.layoutRoot && e4.willUpdate(false);
            }
            const { layoutId: e3, layout: n3 } = this.options;
            if (void 0 === e3 && !n3) return;
            const i3 = this.getTransformTemplate();
            this.prevTransformTemplateValue = i3 ? i3(this.latestValues, "") : void 0, this.updateSnapshot(), t3 && this.notifyListeners("willUpdate");
          }
          update() {
            this.updateScheduled = false;
            if (this.isUpdateBlocked()) return this.unblockUpdate(), this.clearAllSnapshots(), void this.nodes.forEach(Ws);
            this.isUpdating || this.nodes.forEach(Ns), this.isUpdating = false, this.nodes.forEach(zs), this.nodes.forEach(Fs), this.nodes.forEach(Os), this.clearAllSnapshots();
            const t3 = dt.now();
            rt.delta = ne(0, 1e3 / 60, t3 - rt.timestamp), rt.timestamp = t3, rt.isProcessing = true, at.update.process(rt), at.preRender.process(rt), at.render.process(rt), rt.isProcessing = false;
          }
          didUpdate() {
            this.updateScheduled || (this.updateScheduled = true, lt.read(this.scheduleUpdate));
          }
          clearAllSnapshots() {
            this.nodes.forEach(Us), this.sharedNodes.forEach(Ks);
          }
          scheduleUpdateProjection() {
            this.projectionUpdateScheduled || (this.projectionUpdateScheduled = true, st.preRender(this.updateProjection, false, true));
          }
          scheduleCheckAfterUnmount() {
            st.postRender(() => {
              this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
            });
          }
          updateSnapshot() {
            !this.snapshot && this.instance && (this.snapshot = this.measure(), !this.snapshot || Dt(this.snapshot.measuredBox.x) || Dt(this.snapshot.measuredBox.y) || (this.snapshot = void 0));
          }
          updateLayout() {
            if (!this.instance) return;
            if (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead() || this.isLayoutDirty)) return;
            if (this.resumeFrom && !this.resumeFrom.instance) for (let t4 = 0; t4 < this.path.length; t4++) {
              this.path[t4].updateScroll();
            }
            const t3 = this.layout;
            this.layout = this.measure(false), this.layoutCorrected = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }, this.isLayoutDirty = false, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
            const { visualElement: e3 } = this.options;
            e3 && e3.notify("LayoutMeasure", this.layout.layoutBox, t3 ? t3.layoutBox : void 0);
          }
          updateScroll(t3 = "measure") {
            let e3 = Boolean(this.options.layoutScroll && this.instance);
            if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === t3 && (e3 = false), e3) {
              const e4 = i2(this.instance);
              this.scroll = { animationId: this.root.animationId, phase: t3, isRoot: e4, offset: n2(this.instance), wasRoot: this.scroll ? this.scroll.isRoot : e4 };
            }
          }
          resetTransform() {
            if (!s2) return;
            const t3 = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, e3 = this.projectionDelta && !xs(this.projectionDelta), n3 = this.getTransformTemplate(), i3 = n3 ? n3(this.latestValues, "") : void 0, o2 = i3 !== this.prevTransformTemplateValue;
            t3 && (e3 || ns(this.latestValues) || o2) && (s2(this.instance, i3), this.shouldResetTransform = false, this.scheduleRender());
          }
          measure(t3 = true) {
            const e3 = this.measurePageBox();
            let n3 = this.removeElementScroll(e3);
            var i3;
            return t3 && (n3 = this.removeTransform(n3)), to((i3 = n3).x), to(i3.y), { animationId: this.root.animationId, measuredBox: e3, layoutBox: n3, latestValues: {}, source: this.id };
          }
          measurePageBox() {
            var t3;
            const { visualElement: e3 } = this.options;
            if (!e3) return { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
            const n3 = e3.measureViewportBox();
            if (!((null === (t3 = this.scroll) || void 0 === t3 ? void 0 : t3.wasRoot) || this.path.some(no))) {
              const { scroll: t4 } = this.root;
              t4 && (us(n3.x, t4.offset.x), us(n3.y, t4.offset.y));
            }
            return n3;
          }
          removeElementScroll(t3) {
            var e3;
            const n3 = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
            if (Ji(n3, t3), null === (e3 = this.scroll) || void 0 === e3 ? void 0 : e3.wasRoot) return n3;
            for (let e4 = 0; e4 < this.path.length; e4++) {
              const i3 = this.path[e4], { scroll: s3, options: o2 } = i3;
              i3 !== this.root && s3 && o2.layoutScroll && (s3.wasRoot && Ji(n3, t3), us(n3.x, s3.offset.x), us(n3.y, s3.offset.y));
            }
            return n3;
          }
          applyTransform(t3, e3 = false) {
            const n3 = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
            Ji(n3, t3);
            for (let t4 = 0; t4 < this.path.length; t4++) {
              const i3 = this.path[t4];
              !e3 && i3.options.layoutScroll && i3.scroll && i3 !== i3.root && hs(n3, { x: -i3.scroll.offset.x, y: -i3.scroll.offset.y }), ns(i3.latestValues) && hs(n3, i3.latestValues);
            }
            return ns(this.latestValues) && hs(n3, this.latestValues), n3;
          }
          removeTransform(t3) {
            const e3 = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
            Ji(e3, t3);
            for (let t4 = 0; t4 < this.path.length; t4++) {
              const n3 = this.path[t4];
              if (!n3.instance) continue;
              if (!ns(n3.latestValues)) continue;
              es(n3.latestValues) && n3.updateSnapshot();
              const i3 = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
              Ji(i3, n3.measurePageBox()), gs(e3, n3.latestValues, n3.snapshot ? n3.snapshot.layoutBox : void 0, i3);
            }
            return ns(this.latestValues) && gs(e3, this.latestValues), e3;
          }
          setTargetDelta(t3) {
            this.targetDelta = t3, this.root.scheduleUpdateProjection(), this.isProjectionDirty = true;
          }
          setOptions(t3) {
            this.options = { ...this.options, ...t3, crossfade: void 0 === t3.crossfade || t3.crossfade };
          }
          clearMeasurements() {
            this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = false;
          }
          forceRelativeParentToResolveTarget() {
            this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== rt.timestamp && this.relativeParent.resolveTargetDelta(true);
          }
          resolveTargetDelta(t3 = false) {
            var e3;
            const n3 = this.getLead();
            this.isProjectionDirty || (this.isProjectionDirty = n3.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = n3.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = n3.isSharedProjectionDirty);
            const i3 = Boolean(this.resumingFrom) || this !== n3;
            if (!(t3 || i3 && this.isSharedProjectionDirty || this.isProjectionDirty || (null === (e3 = this.parent) || void 0 === e3 ? void 0 : e3.isProjectionDirty) || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) return;
            const { layout: s3, layoutId: o2 } = this.options;
            if (this.layout && (s3 || o2)) {
              if (this.resolvedRelativeTargetAt = rt.timestamp, !this.targetDelta && !this.relativeTarget) {
                const t4 = this.getClosestProjectingParent();
                t4 && t4.layout && 1 !== this.animationProgress ? (this.relativeParent = t4, this.forceRelativeParentToResolveTarget(), this.relativeTarget = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }, this.relativeTargetOrigin = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }, Ot(this.relativeTargetOrigin, this.layout.layoutBox, t4.layout.layoutBox), Ji(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
              }
              var r2, a2, l2;
              if (this.relativeTarget || this.targetDelta) {
                if (this.target || (this.target = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }, this.targetWithTransforms = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), r2 = this.target, a2 = this.relativeTarget, l2 = this.relativeParent.target, Bt(r2.x, a2.x, l2.x), Bt(r2.y, a2.y, l2.y)) : this.targetDelta ? (Boolean(this.resumingFrom) ? this.target = this.applyTransform(this.layout.layoutBox) : Ji(this.target, this.layout.layoutBox), ls(this.target, this.targetDelta)) : Ji(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget) {
                  this.attemptToResolveRelativeTarget = false;
                  const t4 = this.getClosestProjectingParent();
                  t4 && Boolean(t4.resumingFrom) === Boolean(this.resumingFrom) && !t4.options.layoutScroll && t4.target && 1 !== this.animationProgress ? (this.relativeParent = t4, this.forceRelativeParentToResolveTarget(), this.relativeTarget = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }, this.relativeTargetOrigin = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }, Ot(this.relativeTargetOrigin, this.target, t4.target), Ji(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
                }
              }
            }
          }
          getClosestProjectingParent() {
            if (this.parent && !es(this.parent.latestValues) && !is(this.parent.latestValues)) return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
          }
          isProjecting() {
            return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
          }
          calcProjection() {
            var t3;
            const e3 = this.getLead(), n3 = Boolean(this.resumingFrom) || this !== e3;
            let i3 = true;
            if ((this.isProjectionDirty || (null === (t3 = this.parent) || void 0 === t3 ? void 0 : t3.isProjectionDirty)) && (i3 = false), n3 && (this.isSharedProjectionDirty || this.isTransformDirty) && (i3 = false), this.resolvedRelativeTargetAt === rt.timestamp && (i3 = false), i3) return;
            const { layout: s3, layoutId: o2 } = this.options;
            if (this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !s3 && !o2) return;
            Ji(this.layoutCorrected, this.layout.layoutBox);
            const r2 = this.treeScale.x, a2 = this.treeScale.y;
            !function(t4, e4, n4, i4 = false) {
              const s4 = n4.length;
              if (!s4) return;
              let o3, r3;
              e4.x = e4.y = 1;
              for (let a3 = 0; a3 < s4; a3++) {
                o3 = n4[a3], r3 = o3.projectionDelta;
                const { visualElement: s5 } = o3.options;
                s5 && s5.props.style && "contents" === s5.props.style.display || (i4 && o3.options.layoutScroll && o3.scroll && o3 !== o3.root && hs(t4, { x: -o3.scroll.offset.x, y: -o3.scroll.offset.y }), r3 && (e4.x *= r3.x.scale, e4.y *= r3.y.scale, ls(t4, r3)), i4 && ns(o3.latestValues) && hs(t4, o3.latestValues));
              }
              e4.x < 1.0000000000001 && e4.x > 0.999999999999 && (e4.x = 1), e4.y < 1.0000000000001 && e4.y > 0.999999999999 && (e4.y = 1);
            }(this.layoutCorrected, this.treeScale, this.path, n3), !e3.layout || e3.target || 1 === this.treeScale.x && 1 === this.treeScale.y || (e3.target = e3.layout.layoutBox, e3.targetWithTransforms = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } });
            const { target: l2 } = e3;
            l2 ? (this.projectionDelta && this.prevProjectionDelta ? (Qi(this.prevProjectionDelta.x, this.projectionDelta.x), Qi(this.prevProjectionDelta.y, this.projectionDelta.y)) : this.createProjectionDeltas(), Lt(this.projectionDelta, this.layoutCorrected, l2, this.latestValues), this.treeScale.x === r2 && this.treeScale.y === a2 && bs(this.projectionDelta.x, this.prevProjectionDelta.x) && bs(this.projectionDelta.y, this.prevProjectionDelta.y) || (this.hasProjected = true, this.scheduleRender(), this.notifyListeners("projectionUpdate", l2))) : this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
          }
          hide() {
            this.isVisible = false;
          }
          show() {
            this.isVisible = true;
          }
          scheduleRender(t3 = true) {
            var e3;
            if (null === (e3 = this.options.visualElement) || void 0 === e3 || e3.scheduleRender(), t3) {
              const t4 = this.getStack();
              t4 && t4.scheduleRender();
            }
            this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
          }
          createProjectionDeltas() {
            this.prevProjectionDelta = { x: { translate: 0, scale: 1, origin: 0, originPoint: 0 }, y: { translate: 0, scale: 1, origin: 0, originPoint: 0 } }, this.projectionDelta = { x: { translate: 0, scale: 1, origin: 0, originPoint: 0 }, y: { translate: 0, scale: 1, origin: 0, originPoint: 0 } }, this.projectionDeltaWithTransform = { x: { translate: 0, scale: 1, origin: 0, originPoint: 0 }, y: { translate: 0, scale: 1, origin: 0, originPoint: 0 } };
          }
          setAnimationOrigin(t3, e3 = false) {
            const n3 = this.snapshot, i3 = n3 ? n3.latestValues : {}, s3 = { ...this.latestValues }, o2 = { x: { translate: 0, scale: 1, origin: 0, originPoint: 0 }, y: { translate: 0, scale: 1, origin: 0, originPoint: 0 } };
            this.relativeParent && this.relativeParent.options.layoutRoot || (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !e3;
            const r2 = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }, a2 = (n3 ? n3.source : void 0) !== (this.layout ? this.layout.source : void 0), l2 = this.getStack(), u2 = !l2 || l2.members.length <= 1, c2 = Boolean(a2 && !u2 && true === this.options.crossfade && !this.path.some(qs));
            let h2;
            this.animationProgress = 0, this.mixTargetDelta = (e4) => {
              const n4 = e4 / 1e3;
              var l3, d2;
              Gs(o2.x, t3.x, n4), Gs(o2.y, t3.y, n4), this.setTargetDelta(o2), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Ot(r2, this.layout.layoutBox, this.relativeParent.layout.layoutBox), function(t4, e5, n5, i4) {
                _s(t4.x, e5.x, n5.x, i4), _s(t4.y, e5.y, n5.y, i4);
              }(this.relativeTarget, this.relativeTargetOrigin, r2, n4), h2 && (l3 = this.relativeTarget, d2 = h2, ws(l3.x, d2.x) && ws(l3.y, d2.y)) && (this.isProjectionDirty = false), h2 || (h2 = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }), Ji(h2, this.relativeTarget)), a2 && (this.animationValues = s3, function(t4, e5, n5, i4, s4, o3) {
                s4 ? (t4.opacity = Rt(0, void 0 !== n5.opacity ? n5.opacity : 1, Gi(i4)), t4.opacityExit = Rt(void 0 !== e5.opacity ? e5.opacity : 1, 0, _i(i4))) : o3 && (t4.opacity = Rt(void 0 !== e5.opacity ? e5.opacity : 1, void 0 !== n5.opacity ? n5.opacity : 1, i4));
                for (let s5 = 0; s5 < Hi; s5++) {
                  const o4 = `border${$i[s5]}Radius`;
                  let r3 = Ki(e5, o4), a3 = Ki(n5, o4);
                  if (void 0 === r3 && void 0 === a3) continue;
                  r3 || (r3 = 0), a3 || (a3 = 0);
                  0 === r3 || 0 === a3 || Yi(r3) === Yi(a3) ? (t4[o4] = Math.max(Rt(Xi(r3), Xi(a3), i4), 0), (ge.test(a3) || ge.test(r3)) && (t4[o4] += "%")) : t4[o4] = a3;
                }
                (e5.rotate || n5.rotate) && (t4.rotate = Rt(e5.rotate || 0, n5.rotate || 0, i4));
              }(s3, i3, this.latestValues, n4, c2, u2)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = n4;
            }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
          }
          startAnimation(t3) {
            this.notifyListeners("animationStart"), this.currentAnimation && this.currentAnimation.stop(), this.resumingFrom && this.resumingFrom.currentAnimation && this.resumingFrom.currentAnimation.stop(), this.pendingAnimation && (ot(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = st.update(() => {
              Vs.hasAnimatedSinceResize = true, this.currentAnimation = Li(0, 1e3, { ...t3, onUpdate: (e3) => {
                this.mixTargetDelta(e3), t3.onUpdate && t3.onUpdate(e3);
              }, onStop: () => {
              }, onComplete: () => {
                t3.onComplete && t3.onComplete(), this.completeAnimation();
              } }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
            });
          }
          completeAnimation() {
            this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
            const t3 = this.getStack();
            t3 && t3.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
          }
          finishAnimation() {
            this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(1e3), this.currentAnimation.stop()), this.completeAnimation();
          }
          applyTransformsToTarget() {
            const t3 = this.getLead();
            let { targetWithTransforms: e3, target: n3, layout: i3, latestValues: s3 } = t3;
            if (e3 && n3 && i3) {
              if (this !== t3 && this.layout && i3 && eo(this.options.animationType, this.layout.layoutBox, i3.layoutBox)) {
                n3 = this.target || { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
                const e4 = Dt(this.layout.layoutBox.x);
                n3.x.min = t3.target.x.min, n3.x.max = n3.x.min + e4;
                const i4 = Dt(this.layout.layoutBox.y);
                n3.y.min = t3.target.y.min, n3.y.max = n3.y.min + i4;
              }
              Ji(e3, n3), hs(e3, s3), Lt(this.projectionDeltaWithTransform, this.layoutCorrected, e3, s3);
            }
          }
          registerSharedNode(t3, e3) {
            this.sharedNodes.has(t3) || this.sharedNodes.set(t3, new As());
            this.sharedNodes.get(t3).add(e3);
            const n3 = e3.options.initialPromotionConfig;
            e3.promote({ transition: n3 ? n3.transition : void 0, preserveFollowOpacity: n3 && n3.shouldPreserveFollowOpacity ? n3.shouldPreserveFollowOpacity(e3) : void 0 });
          }
          isLead() {
            const t3 = this.getStack();
            return !t3 || t3.lead === this;
          }
          getLead() {
            var t3;
            const { layoutId: e3 } = this.options;
            return e3 && (null === (t3 = this.getStack()) || void 0 === t3 ? void 0 : t3.lead) || this;
          }
          getPrevLead() {
            var t3;
            const { layoutId: e3 } = this.options;
            return e3 ? null === (t3 = this.getStack()) || void 0 === t3 ? void 0 : t3.prevLead : void 0;
          }
          getStack() {
            const { layoutId: t3 } = this.options;
            if (t3) return this.root.sharedNodes.get(t3);
          }
          promote({ needsReset: t3, transition: e3, preserveFollowOpacity: n3 } = {}) {
            const i3 = this.getStack();
            i3 && i3.promote(this, n3), t3 && (this.projectionDelta = void 0, this.needsReset = true), e3 && this.setOptions({ transition: e3 });
          }
          relegate() {
            const t3 = this.getStack();
            return !!t3 && t3.relegate(this);
          }
          resetSkewAndRotation() {
            const { visualElement: t3 } = this.options;
            if (!t3) return;
            let e3 = false;
            const { latestValues: n3 } = t3;
            if ((n3.z || n3.rotate || n3.rotateX || n3.rotateY || n3.rotateZ || n3.skewX || n3.skewY) && (e3 = true), !e3) return;
            const i3 = {};
            n3.z && Ls("z", t3, i3, this.animationValues);
            for (let e4 = 0; e4 < Rs.length; e4++) Ls("rotate" + Rs[e4], t3, i3, this.animationValues), Ls("skew" + Rs[e4], t3, i3, this.animationValues);
            t3.render();
            for (const e4 in i3) t3.setStaticValue(e4, i3[e4]), this.animationValues && (this.animationValues[e4] = i3[e4]);
            t3.scheduleRender();
          }
          getProjectionStyles(t3) {
            var e3, n3;
            if (!this.instance || this.isSVG) return;
            if (!this.isVisible) return Ds;
            const i3 = { visibility: "" }, s3 = this.getTransformTemplate();
            if (this.needsReset) return this.needsReset = false, i3.opacity = "", i3.pointerEvents = zi(null == t3 ? void 0 : t3.pointerEvents) || "", i3.transform = s3 ? s3(this.latestValues, "") : "none", i3;
            const o2 = this.getLead();
            if (!this.projectionDelta || !this.layout || !o2.target) {
              const e4 = {};
              return this.options.layoutId && (e4.opacity = void 0 !== this.latestValues.opacity ? this.latestValues.opacity : 1, e4.pointerEvents = zi(null == t3 ? void 0 : t3.pointerEvents) || ""), this.hasProjected && !ns(this.latestValues) && (e4.transform = s3 ? s3({}, "") : "none", this.hasProjected = false), e4;
            }
            const r2 = o2.animationValues || o2.latestValues;
            this.applyTransformsToTarget(), i3.transform = function(t4, e4, n4) {
              let i4 = "";
              const s4 = t4.x.translate / e4.x, o3 = t4.y.translate / e4.y, r3 = (null == n4 ? void 0 : n4.z) || 0;
              if ((s4 || o3 || r3) && (i4 = `translate3d(${s4}px, ${o3}px, ${r3}px) `), 1 === e4.x && 1 === e4.y || (i4 += `scale(${1 / e4.x}, ${1 / e4.y}) `), n4) {
                const { transformPerspective: t5, rotate: e5, rotateX: s5, rotateY: o4, skewX: r4, skewY: a4 } = n4;
                t5 && (i4 = `perspective(${t5}px) ${i4}`), e5 && (i4 += `rotate(${e5}deg) `), s5 && (i4 += `rotateX(${s5}deg) `), o4 && (i4 += `rotateY(${o4}deg) `), r4 && (i4 += `skewX(${r4}deg) `), a4 && (i4 += `skewY(${a4}deg) `);
              }
              const a3 = t4.x.scale * e4.x, l3 = t4.y.scale * e4.y;
              return 1 === a3 && 1 === l3 || (i4 += `scale(${a3}, ${l3})`), i4 || "none";
            }(this.projectionDeltaWithTransform, this.treeScale, r2), s3 && (i3.transform = s3(r2, i3.transform));
            const { x: a2, y: l2 } = this.projectionDelta;
            i3.transformOrigin = `${100 * a2.origin}% ${100 * l2.origin}% 0`, o2.animationValues ? i3.opacity = o2 === this ? null !== (n3 = null !== (e3 = r2.opacity) && void 0 !== e3 ? e3 : this.latestValues.opacity) && void 0 !== n3 ? n3 : 1 : this.preserveOpacity ? this.latestValues.opacity : r2.opacityExit : i3.opacity = o2 === this ? void 0 !== r2.opacity ? r2.opacity : "" : void 0 !== r2.opacityExit ? r2.opacityExit : 0;
            for (const t4 in Es) {
              if (void 0 === r2[t4]) continue;
              const { correct: e4, applyTo: n4, isCSSVariable: s4 } = Es[t4], a3 = "none" === i3.transform ? r2[t4] : e4(r2[t4], o2);
              if (n4) {
                const t5 = n4.length;
                for (let e5 = 0; e5 < t5; e5++) i3[n4[e5]] = a3;
              } else s4 ? this.options.visualElement.renderState.vars[t4] = a3 : i3[t4] = a3;
            }
            return this.options.layoutId && (i3.pointerEvents = o2 === this ? zi(null == t3 ? void 0 : t3.pointerEvents) || "" : "none"), i3;
          }
          clearSnapshot() {
            this.resumeFrom = this.snapshot = void 0;
          }
          resetTree() {
            this.root.nodes.forEach((t3) => {
              var e3;
              return null === (e3 = t3.currentAnimation) || void 0 === e3 ? void 0 : e3.stop();
            }), this.root.nodes.forEach(Ws), this.root.sharedNodes.clear();
          }
        };
      }
      function Fs(t2) {
        t2.updateLayout();
      }
      function Os(t2) {
        var e2;
        const n2 = (null === (e2 = t2.resumeFrom) || void 0 === e2 ? void 0 : e2.snapshot) || t2.snapshot;
        if (t2.isLead() && t2.layout && n2 && t2.hasListeners("didUpdate")) {
          const { layoutBox: e3, measuredBox: i2 } = t2.layout, { animationType: s2 } = t2.options, o2 = n2.source !== t2.layout.source;
          "size" === s2 ? Cs((t3) => {
            const i3 = o2 ? n2.measuredBox[t3] : n2.layoutBox[t3], s3 = Dt(i3);
            i3.min = e3[t3].min, i3.max = i3.min + s3;
          }) : eo(s2, n2.layoutBox, e3) && Cs((i3) => {
            const s3 = o2 ? n2.measuredBox[i3] : n2.layoutBox[i3], r3 = Dt(e3[i3]);
            s3.max = s3.min + r3, t2.relativeTarget && !t2.currentAnimation && (t2.isProjectionDirty = true, t2.relativeTarget[i3].max = t2.relativeTarget[i3].min + r3);
          });
          const r2 = { x: { translate: 0, scale: 1, origin: 0, originPoint: 0 }, y: { translate: 0, scale: 1, origin: 0, originPoint: 0 } };
          Lt(r2, e3, n2.layoutBox);
          const a2 = { x: { translate: 0, scale: 1, origin: 0, originPoint: 0 }, y: { translate: 0, scale: 1, origin: 0, originPoint: 0 } };
          o2 ? Lt(a2, t2.applyTransform(i2, true), n2.measuredBox) : Lt(a2, e3, n2.layoutBox);
          const l2 = !xs(r2);
          let u2 = false;
          if (!t2.resumeFrom) {
            const i3 = t2.getClosestProjectingParent();
            if (i3 && !i3.resumeFrom) {
              const { snapshot: s3, layout: o3 } = i3;
              if (s3 && o3) {
                const r3 = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
                Ot(r3, n2.layoutBox, s3.layoutBox);
                const a3 = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
                Ot(a3, e3, o3.layoutBox), Ss(r3, a3) || (u2 = true), i3.options.layoutRoot && (t2.relativeTarget = a3, t2.relativeTargetOrigin = r3, t2.relativeParent = i3);
              }
            }
          }
          t2.notifyListeners("didUpdate", { layout: e3, snapshot: n2, delta: a2, layoutDelta: r2, hasLayoutChanged: l2, hasRelativeLayoutChanged: u2 });
        } else if (t2.isLead()) {
          const { onExitComplete: e3 } = t2.options;
          e3 && e3();
        }
        t2.options.transition = void 0;
      }
      function js(t2) {
        t2.parent && (t2.isProjecting() || (t2.isProjectionDirty = t2.parent.isProjectionDirty), t2.isSharedProjectionDirty || (t2.isSharedProjectionDirty = Boolean(t2.isProjectionDirty || t2.parent.isProjectionDirty || t2.parent.isSharedProjectionDirty)), t2.isTransformDirty || (t2.isTransformDirty = t2.parent.isTransformDirty));
      }
      function Is(t2) {
        t2.isProjectionDirty = t2.isSharedProjectionDirty = t2.isTransformDirty = false;
      }
      function Us(t2) {
        t2.clearSnapshot();
      }
      function Ws(t2) {
        t2.clearMeasurements();
      }
      function Ns(t2) {
        t2.isLayoutDirty = false;
      }
      function zs(t2) {
        const { visualElement: e2 } = t2.options;
        e2 && e2.getProps().onBeforeLayoutMeasure && e2.notify("BeforeLayoutMeasure"), t2.resetTransform();
      }
      function $s(t2) {
        t2.finishAnimation(), t2.targetDelta = t2.relativeTarget = t2.target = void 0, t2.isProjectionDirty = true;
      }
      function Hs(t2) {
        t2.resolveTargetDelta();
      }
      function Xs(t2) {
        t2.calcProjection();
      }
      function Ys(t2) {
        t2.resetSkewAndRotation();
      }
      function Ks(t2) {
        t2.removeLeadSnapshot();
      }
      function Gs(t2, e2, n2) {
        t2.translate = Rt(e2.translate, 0, n2), t2.scale = Rt(e2.scale, 1, n2), t2.origin = e2.origin, t2.originPoint = e2.originPoint;
      }
      function _s(t2, e2, n2, i2) {
        t2.min = Rt(e2.min, n2.min, i2), t2.max = Rt(e2.max, n2.max, i2);
      }
      function qs(t2) {
        return t2.animationValues && void 0 !== t2.animationValues.opacityExit;
      }
      const Zs = { duration: 0.45, ease: [0.4, 0, 0.1, 1] }, Js = (t2) => "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t2), Qs = Js("applewebkit/") && !Js("chrome/") ? Math.round : R;
      function to(t2) {
        t2.min = Qs(t2.min), t2.max = Qs(t2.max);
      }
      function eo(t2, e2, n2) {
        return "position" === t2 || "preserve-aspect" === t2 && (i2 = Ts(e2), s2 = Ts(n2), o2 = 0.2, !(Math.abs(i2 - s2) <= o2));
        var i2, s2, o2;
      }
      function no(t2) {
        var e2;
        return t2 !== t2.root && (null === (e2 = t2.scroll) || void 0 === e2 ? void 0 : e2.wasRoot);
      }
      function io(t2, e2, n2, i2 = { passive: true }) {
        return t2.addEventListener(e2, n2, i2), () => t2.removeEventListener(e2, n2);
      }
      const so = Bs({ attachResizeListener: (t2, e2) => io(t2, "resize", e2), measureScroll: () => ({ x: document.documentElement.scrollLeft || document.body.scrollLeft, y: document.documentElement.scrollTop || document.body.scrollTop }), checkIsScrollRoot: () => true }), oo = { current: void 0 }, ro = Bs({ measureScroll: (t2) => ({ x: t2.scrollLeft, y: t2.scrollTop }), defaultParent: () => {
        if (!oo.current) {
          const t2 = new so({});
          t2.mount(window), t2.setOptions({ layoutScroll: true }), oo.current = t2;
        }
        return oo.current;
      }, resetTransform: (t2, e2) => {
        t2.style.transform = void 0 !== e2 ? e2 : "none";
      }, checkIsScrollRoot: (t2) => Boolean("fixed" === window.getComputedStyle(t2).position) });
      function ao(t2, e2) {
        return e2.max === e2.min ? 0 : t2 / (e2.max - e2.min) * 100;
      }
      const lo = { correct: (t2, e2) => {
        if (!e2.target) return t2;
        if ("string" == typeof t2) {
          if (!ye.test(t2)) return t2;
          t2 = parseFloat(t2);
        }
        return `${ao(t2, e2.target.x)}% ${ao(t2, e2.target.y)}%`;
      } }, uo = { correct: (t2, { treeScale: e2, projectionDelta: n2 }) => {
        const i2 = t2, s2 = Ve.parse(t2);
        if (s2.length > 5) return i2;
        const o2 = Ve.createTransformer(t2), r2 = "number" != typeof s2[0] ? 1 : 0, a2 = n2.x.scale * e2.x, l2 = n2.y.scale * e2.y;
        s2[0 + r2] /= a2, s2[1 + r2] /= l2;
        const u2 = Rt(a2, l2, 0.5);
        return "number" == typeof s2[2 + r2] && (s2[2 + r2] /= u2), "number" == typeof s2[3 + r2] && (s2[3 + r2] /= u2), o2(s2);
      } };
      function co({ top: t2, left: e2, right: n2, bottom: i2 }) {
        return { x: { min: e2, max: n2 }, y: { min: t2, max: i2 } };
      }
      function ho(t2, e2) {
        return co(function(t3, e3) {
          if (!e3) return t3;
          const n2 = e3({ x: t3.left, y: t3.top }), i2 = e3({ x: t3.right, y: t3.bottom });
          return { top: n2.y, left: n2.x, bottom: i2.y, right: i2.x };
        }(t2.getBoundingClientRect(), e2));
      }
      const po = { animation: ["animate", "variants", "whileHover", "whileTap", "exit", "whileInView", "whileFocus", "whileDrag"], exit: ["exit"], drag: ["drag", "dragControls"], focus: ["whileFocus"], hover: ["whileHover", "onHoverStart", "onHoverEnd"], tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"], pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"], inView: ["whileInView", "onViewportEnter", "onViewportLeave"], layout: ["layout", "layoutId"] }, mo = {};
      for (const t2 in po) mo[t2] = { isEnabled: (e2) => po[t2].some((t3) => !!e2[t3]) };
      const fo = { current: null }, go = { current: false };
      function yo() {
        if (go.current = true, g) if (window.matchMedia) {
          const t2 = window.matchMedia("(prefers-reduced-motion)"), e2 = () => fo.current = t2.matches;
          t2.addListener(e2), e2();
        } else fo.current = false;
      }
      const vo = [...vn, Se, Ve], xo = /* @__PURE__ */ new WeakMap();
      function wo(t2) {
        return null !== t2 && "object" == typeof t2 && "function" == typeof t2.start;
      }
      function Po(t2) {
        return "string" == typeof t2 || Array.isArray(t2);
      }
      const So = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"], To = ["initial", ...So];
      function bo(t2) {
        return wo(t2.animate) || To.some((e2) => Po(t2[e2]));
      }
      function Ao(t2) {
        return Boolean(bo(t2) || t2.variants);
      }
      function Eo(t2) {
        const e2 = [{}, {}];
        return null == t2 || t2.values.forEach((t3, n2) => {
          e2[0][n2] = t3.get(), e2[1][n2] = t3.getVelocity();
        }), e2;
      }
      function Mo(t2, e2, n2, i2) {
        if ("function" == typeof e2) {
          const [s2, o2] = Eo(i2);
          e2 = e2(void 0 !== n2 ? n2 : t2.custom, s2, o2);
        }
        if ("string" == typeof e2 && (e2 = t2.variants && t2.variants[e2]), "function" == typeof e2) {
          const [s2, o2] = Eo(i2);
          e2 = e2(void 0 !== n2 ? n2 : t2.custom, s2, o2);
        }
        return e2;
      }
      const Co = ["AnimationStart", "AnimationComplete", "Update", "BeforeLayoutMeasure", "LayoutMeasure", "LayoutAnimationStart", "LayoutAnimationComplete"];
      class Vo {
        scrapeMotionValuesFromProps(t2, e2, n2) {
          return {};
        }
        constructor({ parent: t2, props: e2, presenceContext: n2, reducedMotionConfig: i2, blockInitialAnimation: s2, visualState: o2 }, r2 = {}) {
          this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = false, this.isControllingVariants = false, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = ln, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
            this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
          }, this.renderScheduledAt = 0, this.scheduleRender = () => {
            const t3 = dt.now();
            this.renderScheduledAt < t3 && (this.renderScheduledAt = t3, st.render(this.render, false, true));
          };
          const { latestValues: a2, renderState: l2, onUpdate: u2 } = o2;
          this.onUpdate = u2, this.latestValues = a2, this.baseTarget = { ...a2 }, this.initialValues = e2.initial ? { ...a2 } : {}, this.renderState = l2, this.parent = t2, this.props = e2, this.presenceContext = n2, this.depth = t2 ? t2.depth + 1 : 0, this.reducedMotionConfig = i2, this.options = r2, this.blockInitialAnimation = Boolean(s2), this.isControllingVariants = bo(e2), this.isVariantNode = Ao(e2), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = Boolean(t2 && t2.current);
          const { willChange: c2, ...h2 } = this.scrapeMotionValuesFromProps(e2, {}, this);
          for (const t3 in h2) {
            const e3 = h2[t3];
            void 0 !== a2[t3] && Ut(e3) && e3.set(a2[t3], false);
          }
        }
        mount(t2) {
          this.current = t2, xo.set(t2, this), this.projection && !this.projection.instance && this.projection.mount(t2), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((t3, e2) => this.bindToMotionValue(e2, t3)), go.current || yo(), this.shouldReduceMotion = "never" !== this.reducedMotionConfig && ("always" === this.reducedMotionConfig || fo.current), this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext);
        }
        unmount() {
          this.projection && this.projection.unmount(), ot(this.notifyUpdate), ot(this.render), this.valueSubscriptions.forEach((t2) => t2()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent && this.parent.children.delete(this);
          for (const t2 in this.events) this.events[t2].clear();
          for (const t2 in this.features) {
            const e2 = this.features[t2];
            e2 && (e2.unmount(), e2.isMounted = false);
          }
          this.current = null;
        }
        bindToMotionValue(t2, e2) {
          this.valueSubscriptions.has(t2) && this.valueSubscriptions.get(t2)();
          const n2 = te.has(t2);
          n2 && this.onBindTransform && this.onBindTransform();
          const i2 = e2.on("change", (e3) => {
            this.latestValues[t2] = e3, this.props.onUpdate && st.preRender(this.notifyUpdate), n2 && this.projection && (this.projection.isTransformDirty = true);
          }), s2 = e2.on("renderRequest", this.scheduleRender);
          let o2;
          window.MotionCheckAppearSync && (o2 = window.MotionCheckAppearSync(this, t2, e2)), this.valueSubscriptions.set(t2, () => {
            i2(), s2(), o2 && o2(), e2.owner && e2.stop();
          });
        }
        sortNodePosition(t2) {
          return this.current && this.sortInstanceNodePosition && this.type === t2.type ? this.sortInstanceNodePosition(this.current, t2.current) : 0;
        }
        updateFeatures() {
          let t2 = "animation";
          for (t2 in mo) {
            const e2 = mo[t2];
            if (!e2) continue;
            const { isEnabled: n2, Feature: i2 } = e2;
            if (!this.features[t2] && i2 && n2(this.props) && (this.features[t2] = new i2(this)), this.features[t2]) {
              const e3 = this.features[t2];
              e3.isMounted ? e3.update() : (e3.mount(), e3.isMounted = true);
            }
          }
        }
        triggerBuild() {
          this.build(this.renderState, this.latestValues, this.props);
        }
        measureViewportBox() {
          return this.current ? this.measureInstanceViewportBox(this.current, this.props) : { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
        }
        getStaticValue(t2) {
          return this.latestValues[t2];
        }
        setStaticValue(t2, e2) {
          this.latestValues[t2] = e2;
        }
        update(t2, e2) {
          (t2.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t2, this.prevPresenceContext = this.presenceContext, this.presenceContext = e2;
          for (let e3 = 0; e3 < Co.length; e3++) {
            const n2 = Co[e3];
            this.propEventSubscriptions[n2] && (this.propEventSubscriptions[n2](), delete this.propEventSubscriptions[n2]);
            const i2 = t2["on" + n2];
            i2 && (this.propEventSubscriptions[n2] = this.on(n2, i2));
          }
          this.prevMotionValues = function(t3, e3, n2) {
            for (const i2 in e3) {
              const s2 = e3[i2], o2 = n2[i2];
              if (Ut(s2)) t3.addValue(i2, s2);
              else if (Ut(o2)) t3.addValue(i2, Vt(s2, { owner: t3 }));
              else if (o2 !== s2) if (t3.hasValue(i2)) {
                const e4 = t3.getValue(i2);
                true === e4.liveStyle ? e4.jump(s2) : e4.hasAnimated || e4.set(s2);
              } else {
                const e4 = t3.getStaticValue(i2);
                t3.addValue(i2, Vt(void 0 !== e4 ? e4 : s2, { owner: t3 }));
              }
            }
            for (const i2 in n2) void 0 === e3[i2] && t3.removeValue(i2);
            return e3;
          }(this, this.scrapeMotionValuesFromProps(t2, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue(), this.onUpdate && this.onUpdate(this);
        }
        getProps() {
          return this.props;
        }
        getVariant(t2) {
          return this.props.variants ? this.props.variants[t2] : void 0;
        }
        getDefaultTransition() {
          return this.props.transition;
        }
        getTransformPagePoint() {
          return this.props.transformPagePoint;
        }
        getClosestVariantNode() {
          return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
        }
        addVariantChild(t2) {
          const e2 = this.getClosestVariantNode();
          if (e2) return e2.variantChildren && e2.variantChildren.add(t2), () => e2.variantChildren.delete(t2);
        }
        addValue(t2, e2) {
          const n2 = this.values.get(t2);
          e2 !== n2 && (n2 && this.removeValue(t2), this.bindToMotionValue(t2, e2), this.values.set(t2, e2), this.latestValues[t2] = e2.get());
        }
        removeValue(t2) {
          this.values.delete(t2);
          const e2 = this.valueSubscriptions.get(t2);
          e2 && (e2(), this.valueSubscriptions.delete(t2)), delete this.latestValues[t2], this.removeValueFromRenderState(t2, this.renderState);
        }
        hasValue(t2) {
          return this.values.has(t2);
        }
        getValue(t2, e2) {
          if (this.props.values && this.props.values[t2]) return this.props.values[t2];
          let n2 = this.values.get(t2);
          return void 0 === n2 && void 0 !== e2 && (n2 = Vt(null === e2 ? void 0 : e2, { owner: this }), this.addValue(t2, n2)), n2;
        }
        readValue(t2, e2) {
          var n2;
          let i2 = void 0 === this.latestValues[t2] && this.current ? null !== (n2 = this.getBaseTargetFromProps(this.props, t2)) && void 0 !== n2 ? n2 : this.readValueFromInstance(this.current, t2, this.options) : this.latestValues[t2];
          var s2;
          return null != i2 && ("string" == typeof i2 && (un(i2) || Jt(i2)) ? i2 = parseFloat(i2) : (s2 = i2, !vo.find(yn(s2)) && Ve.test(e2) && (i2 = We(t2, e2))), this.setBaseTarget(t2, Ut(i2) ? i2.get() : i2)), Ut(i2) ? i2.get() : i2;
        }
        setBaseTarget(t2, e2) {
          this.baseTarget[t2] = e2;
        }
        getBaseTarget(t2) {
          var e2;
          const { initial: n2 } = this.props;
          let i2;
          if ("string" == typeof n2 || "object" == typeof n2) {
            const s3 = Mo(this.props, n2, null === (e2 = this.presenceContext) || void 0 === e2 ? void 0 : e2.custom);
            s3 && (i2 = s3[t2]);
          }
          if (n2 && void 0 !== i2) return i2;
          const s2 = this.getBaseTargetFromProps(this.props, t2);
          return void 0 === s2 || Ut(s2) ? void 0 !== this.initialValues[t2] && void 0 === i2 ? void 0 : this.baseTarget[t2] : s2;
        }
        on(t2, e2) {
          return this.events[t2] || (this.events[t2] = new O()), this.events[t2].add(e2);
        }
        notify(t2, ...e2) {
          this.events[t2] && this.events[t2].notify(...e2);
        }
      }
      class Ro extends Vo {
        constructor() {
          super(...arguments), this.KeyframeResolver = wn;
        }
        sortInstanceNodePosition(t2, e2) {
          return 2 & t2.compareDocumentPosition(e2) ? 1 : -1;
        }
        getBaseTargetFromProps(t2, e2) {
          return t2.style ? t2.style[e2] : void 0;
        }
        removeValueFromRenderState(t2, { vars: e2, style: n2 }) {
          delete e2[t2], delete n2[t2];
        }
        handleChildMotionValue() {
          this.childSubscription && (this.childSubscription(), delete this.childSubscription);
          const { children: t2 } = this.props;
          Ut(t2) && (this.childSubscription = t2.on("change", (t3) => {
            this.current && (this.current.textContent = "" + t3);
          }));
        }
      }
      const Do = (t2, e2) => e2 && "number" == typeof t2 ? e2.transform(t2) : t2, ko = { x: "translateX", y: "translateY", z: "translateZ", transformPerspective: "perspective" }, Lo = Qt.length;
      function Bo(t2, e2, n2) {
        let i2 = "", s2 = true;
        for (let o2 = 0; o2 < Lo; o2++) {
          const r2 = Qt[o2], a2 = t2[r2];
          if (void 0 === a2) continue;
          let l2 = true;
          if (l2 = "number" == typeof a2 ? a2 === (r2.startsWith("scale") ? 1 : 0) : 0 === parseFloat(a2), !l2 || n2) {
            const t3 = Do(a2, je[r2]);
            if (!l2) {
              s2 = false;
              i2 += `${ko[r2] || r2}(${t3}) `;
            }
            n2 && (e2[r2] = t3);
          }
        }
        return i2 = i2.trim(), n2 ? i2 = n2(e2, s2 ? "" : i2) : s2 && (i2 = "none"), i2;
      }
      function Fo(t2, e2, n2) {
        const { style: i2, vars: s2, transformOrigin: o2 } = t2;
        let r2 = false, a2 = false;
        for (const t3 in e2) {
          const n3 = e2[t3];
          if (te.has(t3)) r2 = true;
          else if (hn(t3)) s2[t3] = n3;
          else {
            const e3 = Do(n3, je[t3]);
            t3.startsWith("origin") ? (a2 = true, o2[t3] = e3) : i2[t3] = e3;
          }
        }
        if (e2.transform || (r2 || n2 ? i2.transform = Bo(e2, t2.transform, n2) : i2.transform && (i2.transform = "none")), a2) {
          const { originX: t3 = "50%", originY: e3 = "50%", originZ: n3 = 0 } = o2;
          i2.transformOrigin = `${t3} ${e3} ${n3}`;
        }
      }
      function Oo(t2, { style: e2, vars: n2 }, i2, s2) {
        Object.assign(t2.style, e2, s2 && s2.getProjectionStyles(i2));
        for (const e3 in n2) t2.style.setProperty(e3, n2[e3]);
      }
      function jo(t2, { layout: e2, layoutId: n2 }) {
        return te.has(t2) || t2.startsWith("origin") || (e2 || void 0 !== n2) && (!!Es[t2] || "opacity" === t2);
      }
      function Io(t2, e2, n2) {
        var i2;
        const { style: s2 } = t2, o2 = {};
        for (const r2 in s2) (Ut(s2[r2]) || e2.style && Ut(e2.style[r2]) || jo(r2, t2) || void 0 !== (null === (i2 = null == n2 ? void 0 : n2.getValue(r2)) || void 0 === i2 ? void 0 : i2.liveStyle)) && (o2[r2] = s2[r2]);
        return o2;
      }
      class Uo extends Ro {
        constructor() {
          super(...arguments), this.type = "html", this.renderInstance = Oo;
        }
        readValueFromInstance(t2, e2) {
          if (te.has(e2)) return ((t3, e3) => {
            const { transform: n3 = "none" } = getComputedStyle(t3);
            return qe(n3, e3);
          })(t2, e2);
          {
            const i2 = (n2 = t2, window.getComputedStyle(n2)), s2 = (hn(e2) ? i2.getPropertyValue(e2) : i2[e2]) || 0;
            return "string" == typeof s2 ? s2.trim() : s2;
          }
          var n2;
        }
        measureInstanceViewportBox(t2, { transformPagePoint: e2 }) {
          return ho(t2, e2);
        }
        build(t2, e2, n2) {
          Fo(t2, e2, n2.transformTemplate);
        }
        scrapeMotionValuesFromProps(t2, e2, n2) {
          return Io(t2, e2, n2);
        }
      }
      function Wo() {
        const t2 = function() {
          const t3 = e.useRef(false);
          return y(() => (t3.current = true, () => {
            t3.current = false;
          }), []), t3;
        }(), [n2, i2] = e.useState(0), s2 = e.useCallback(() => {
          t2.current && i2(n2 + 1);
        }, [n2]);
        return [e.useCallback(() => st.postRender(s2), [s2]), n2];
      }
      const No = (t2) => true === t2, zo = ({ children: t2, id: n2, inherit: i2 = true }) => {
        const s2 = e.useContext(m), o2 = e.useContext(M), [r2, a2] = Wo(), l2 = e.useRef(null), u2 = s2.id || o2;
        null === l2.current && (((t3) => No(true === t3) || "id" === t3)(i2) && u2 && (n2 = n2 ? u2 + "-" + n2 : u2), l2.current = { id: n2, group: No(i2) && s2.group || It() });
        const c2 = e.useMemo(() => ({ ...l2.current, forceRender: r2 }), [a2]);
        return d(m.Provider, { value: c2, children: t2 });
      }, $o = e.createContext({ strict: false });
      function Ho(t2) {
        for (const e2 in t2) mo[e2] = { ...mo[e2], ...t2[e2] };
      }
      function Xo(t2) {
        return "function" == typeof t2;
      }
      const Yo = /* @__PURE__ */ new Set(["animate", "exit", "variants", "initial", "style", "values", "variants", "transition", "transformTemplate", "custom", "inherit", "onBeforeLayoutMeasure", "onAnimationStart", "onAnimationComplete", "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock", "onDragTransitionEnd", "_dragX", "_dragY", "onHoverStart", "onHoverEnd", "onViewportEnter", "onViewportLeave", "globalTapTarget", "ignoreStrict", "viewport"]);
      function Ko(t2) {
        return t2.startsWith("while") || t2.startsWith("drag") && "draggable" !== t2 || t2.startsWith("layout") || t2.startsWith("onTap") || t2.startsWith("onPan") || t2.startsWith("onLayout") || Yo.has(t2);
      }
      let Go = (t2) => !Ko(t2);
      function _o(t2) {
        t2 && (Go = (e2) => e2.startsWith("on") ? !Ko(e2) : t2(e2));
      }
      try {
        _o(require_is_prop_valid_framer_motion().default);
      } catch (t2) {
      }
      function qo(t2, e2, n2) {
        const i2 = {};
        for (const s2 in t2) "values" === s2 && "object" == typeof t2.values || (Go(s2) || true === n2 && Ko(s2) || !e2 && !Ko(s2) || t2.draggable && s2.startsWith("onDrag")) && (i2[s2] = t2[s2]);
        return i2;
      }
      const Zo = e.createContext(null);
      function Jo(t2) {
        if ("undefined" == typeof Proxy) return t2;
        const e2 = /* @__PURE__ */ new Map();
        return new Proxy((...e3) => t2(...e3), { get: (n2, i2) => "create" === i2 ? t2 : (e2.has(i2) || e2.set(i2, t2(i2)), e2.get(i2)) });
      }
      function Qo(t2, e2, n2) {
        const i2 = t2.getProps();
        return Mo(i2, e2, void 0 !== n2 ? n2 : i2.custom, t2);
      }
      function tr(t2, e2, n2) {
        t2.hasValue(e2) ? t2.getValue(e2).set(n2) : t2.addValue(e2, Vt(n2));
      }
      function er(t2, e2) {
        const n2 = Qo(t2, e2);
        let { transitionEnd: i2 = {}, transition: s2 = {}, ...o2 } = n2 || {};
        o2 = { ...o2, ...i2 };
        for (const e3 in o2) {
          tr(t2, e3, (r2 = o2[e3], Ni(r2) ? r2[r2.length - 1] || 0 : r2));
        }
        var r2;
      }
      function nr(t2, e2) {
        const n2 = t2.getValue("willChange");
        if (i2 = n2, Boolean(Ut(i2) && i2.add)) return n2.add(e2);
        var i2;
      }
      function ir({ protectedKeys: t2, needsAnimating: e2 }, n2) {
        const i2 = t2.hasOwnProperty(n2) && true !== e2[n2];
        return e2[n2] = false, i2;
      }
      function sr(t2, e2, { delay: n2 = 0, transitionOverride: i2, type: s2 } = {}) {
        var o2;
        let { transition: r2 = t2.getDefaultTransition(), transitionEnd: a2, ...l2 } = e2;
        i2 && (r2 = i2);
        const u2 = [], c2 = s2 && t2.animationState && t2.animationState.getState()[s2];
        for (const e3 in l2) {
          const i3 = t2.getValue(e3, null !== (o2 = t2.latestValues[e3]) && void 0 !== o2 ? o2 : null), s3 = l2[e3];
          if (void 0 === s3 || c2 && ir(c2, e3)) continue;
          const a3 = { delay: n2, ...z(r2 || {}, e3) };
          let h2 = false;
          if (window.MotionHandoffAnimation) {
            const n3 = Oi(t2);
            if (n3) {
              const t3 = window.MotionHandoffAnimation(n3, e3, st);
              null !== t3 && (a3.startTime = t3, h2 = true);
            }
          }
          nr(t2, e3), i3.start(ki(e3, i3, s3, t2.shouldReduceMotion && ee.has(e3) ? { type: false } : a3, t2, h2));
          const d2 = i3.animation;
          d2 && u2.push(d2);
        }
        return a2 && Promise.all(u2).then(() => {
          st.update(() => {
            a2 && er(t2, a2);
          });
        }), u2;
      }
      function or(t2, e2, n2 = {}) {
        var i2;
        const s2 = Qo(t2, e2, "exit" === n2.type ? null === (i2 = t2.presenceContext) || void 0 === i2 ? void 0 : i2.custom : void 0);
        let { transition: o2 = t2.getDefaultTransition() || {} } = s2 || {};
        n2.transitionOverride && (o2 = n2.transitionOverride);
        const r2 = s2 ? () => Promise.all(sr(t2, s2, n2)) : () => Promise.resolve(), a2 = t2.variantChildren && t2.variantChildren.size ? (i3 = 0) => {
          const { delayChildren: s3 = 0, staggerChildren: r3, staggerDirection: a3 } = o2;
          return function(t3, e3, n3 = 0, i4 = 0, s4 = 1, o3) {
            const r4 = [], a4 = (t3.variantChildren.size - 1) * i4, l3 = 1 === s4 ? (t4 = 0) => t4 * i4 : (t4 = 0) => a4 - t4 * i4;
            return Array.from(t3.variantChildren).sort(rr).forEach((t4, i5) => {
              t4.notify("AnimationStart", e3), r4.push(or(t4, e3, { ...o3, delay: n3 + l3(i5) }).then(() => t4.notify("AnimationComplete", e3)));
            }), Promise.all(r4);
          }(t2, e2, s3 + i3, r3, a3, n2);
        } : () => Promise.resolve(), { when: l2 } = o2;
        if (l2) {
          const [t3, e3] = "beforeChildren" === l2 ? [r2, a2] : [a2, r2];
          return t3().then(() => e3());
        }
        return Promise.all([r2(), a2(n2.delay)]);
      }
      function rr(t2, e2) {
        return t2.sortNodePosition(e2);
      }
      function ar(t2, e2, n2 = {}) {
        let i2;
        if (t2.notify("AnimationStart", e2), Array.isArray(e2)) {
          const s2 = e2.map((e3) => or(t2, e3, n2));
          i2 = Promise.all(s2);
        } else if ("string" == typeof e2) i2 = or(t2, e2, n2);
        else {
          const s2 = "function" == typeof e2 ? Qo(t2, e2, n2.custom) : e2;
          i2 = Promise.all(sr(t2, s2, n2));
        }
        return i2.then(() => {
          t2.notify("AnimationComplete", e2);
        });
      }
      function lr(t2, e2) {
        if (!Array.isArray(e2)) return false;
        const n2 = e2.length;
        if (n2 !== t2.length) return false;
        for (let i2 = 0; i2 < n2; i2++) if (e2[i2] !== t2[i2]) return false;
        return true;
      }
      const ur = To.length;
      const cr = [...So].reverse(), hr = So.length;
      function dr(t2) {
        let e2 = /* @__PURE__ */ function(t3) {
          return (e3) => Promise.all(e3.map(({ animation: e4, options: n3 }) => ar(t3, e4, n3)));
        }(t2), n2 = fr(), i2 = true;
        const s2 = (e3) => (n3, i3) => {
          var s3;
          const o3 = Qo(t2, i3, "exit" === e3 ? null === (s3 = t2.presenceContext) || void 0 === s3 ? void 0 : s3.custom : void 0);
          if (o3) {
            const { transition: t3, transitionEnd: e4, ...i4 } = o3;
            n3 = { ...n3, ...i4, ...e4 };
          }
          return n3;
        };
        function o2(o3) {
          const { props: r2 } = t2, a2 = function t3(e3) {
            if (!e3) return;
            if (!e3.isControllingVariants) {
              const n4 = e3.parent && t3(e3.parent) || {};
              return void 0 !== e3.props.initial && (n4.initial = e3.props.initial), n4;
            }
            const n3 = {};
            for (let t4 = 0; t4 < ur; t4++) {
              const i3 = To[t4], s3 = e3.props[i3];
              (Po(s3) || false === s3) && (n3[i3] = s3);
            }
            return n3;
          }(t2.parent) || {}, l2 = [], u2 = /* @__PURE__ */ new Set();
          let c2 = {}, h2 = 1 / 0;
          for (let e3 = 0; e3 < hr; e3++) {
            const d3 = cr[e3], p2 = n2[d3], m2 = void 0 !== r2[d3] ? r2[d3] : a2[d3], f2 = Po(m2), g2 = d3 === o3 ? p2.isActive : null;
            false === g2 && (h2 = e3);
            let y2 = m2 === a2[d3] && m2 !== r2[d3] && f2;
            if (y2 && i2 && t2.manuallyAnimateOnMount && (y2 = false), p2.protectedKeys = { ...c2 }, !p2.isActive && null === g2 || !m2 && !p2.prevProp || wo(m2) || "boolean" == typeof m2) continue;
            const v2 = pr(p2.prevProp, m2);
            let x2 = v2 || d3 === o3 && p2.isActive && !y2 && f2 || e3 > h2 && f2, w2 = false;
            const P2 = Array.isArray(m2) ? m2 : [m2];
            let S2 = P2.reduce(s2(d3), {});
            false === g2 && (S2 = {});
            const { prevResolvedValues: T2 = {} } = p2, b2 = { ...T2, ...S2 }, A2 = (e4) => {
              x2 = true, u2.has(e4) && (w2 = true, u2.delete(e4)), p2.needsAnimating[e4] = true;
              const n3 = t2.getValue(e4);
              n3 && (n3.liveStyle = false);
            };
            for (const t3 in b2) {
              const e4 = S2[t3], n3 = T2[t3];
              if (c2.hasOwnProperty(t3)) continue;
              let i3 = false;
              i3 = Ni(e4) && Ni(n3) ? !lr(e4, n3) : e4 !== n3, i3 ? null != e4 ? A2(t3) : u2.add(t3) : void 0 !== e4 && u2.has(t3) ? A2(t3) : p2.protectedKeys[t3] = true;
            }
            p2.prevProp = m2, p2.prevResolvedValues = S2, p2.isActive && (c2 = { ...c2, ...S2 }), i2 && t2.blockInitialAnimation && (x2 = false);
            const E2 = !(y2 && v2) || w2;
            x2 && E2 && l2.push(...P2.map((t3) => ({ animation: t3, options: { type: d3 } })));
          }
          if (u2.size) {
            const e3 = {};
            if ("boolean" != typeof r2.initial) {
              const n3 = Qo(t2, Array.isArray(r2.initial) ? r2.initial[0] : r2.initial);
              n3 && n3.transition && (e3.transition = n3.transition);
            }
            u2.forEach((n3) => {
              const i3 = t2.getBaseTarget(n3), s3 = t2.getValue(n3);
              s3 && (s3.liveStyle = true), e3[n3] = null != i3 ? i3 : null;
            }), l2.push({ animation: e3 });
          }
          let d2 = Boolean(l2.length);
          return !i2 || false !== r2.initial && r2.initial !== r2.animate || t2.manuallyAnimateOnMount || (d2 = false), i2 = false, d2 ? e2(l2) : Promise.resolve();
        }
        return { animateChanges: o2, setActive: function(e3, i3) {
          var s3;
          if (n2[e3].isActive === i3) return Promise.resolve();
          null === (s3 = t2.variantChildren) || void 0 === s3 || s3.forEach((t3) => {
            var n3;
            return null === (n3 = t3.animationState) || void 0 === n3 ? void 0 : n3.setActive(e3, i3);
          }), n2[e3].isActive = i3;
          const r2 = o2(e3);
          for (const t3 in n2) n2[t3].protectedKeys = {};
          return r2;
        }, setAnimateFunction: function(n3) {
          e2 = n3(t2);
        }, getState: () => n2, reset: () => {
          n2 = fr(), i2 = true;
        } };
      }
      function pr(t2, e2) {
        return "string" == typeof e2 ? e2 !== t2 : !!Array.isArray(e2) && !lr(e2, t2);
      }
      function mr(t2 = false) {
        return { isActive: t2, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} };
      }
      function fr() {
        return { animate: mr(true), whileInView: mr(), whileHover: mr(), whileTap: mr(), whileDrag: mr(), whileFocus: mr(), exit: mr() };
      }
      class gr {
        constructor(t2) {
          this.isMounted = false, this.node = t2;
        }
        update() {
        }
      }
      let yr = 0;
      const vr = { animation: { Feature: class extends gr {
        constructor(t2) {
          super(t2), t2.animationState || (t2.animationState = dr(t2));
        }
        updateAnimationControlsSubscription() {
          const { animate: t2 } = this.node.getProps();
          wo(t2) && (this.unmountControls = t2.subscribe(this.node));
        }
        mount() {
          this.updateAnimationControlsSubscription();
        }
        update() {
          const { animate: t2 } = this.node.getProps(), { animate: e2 } = this.node.prevProps || {};
          t2 !== e2 && this.updateAnimationControlsSubscription();
        }
        unmount() {
          var t2;
          this.node.animationState.reset(), null === (t2 = this.unmountControls) || void 0 === t2 || t2.call(this);
        }
      } }, exit: { Feature: class extends gr {
        constructor() {
          super(...arguments), this.id = yr++;
        }
        update() {
          if (!this.node.presenceContext) return;
          const { isPresent: t2, onExitComplete: e2 } = this.node.presenceContext, { isPresent: n2 } = this.node.prevPresenceContext || {};
          if (!this.node.animationState || t2 === n2) return;
          const i2 = this.node.animationState.setActive("exit", !t2);
          e2 && !t2 && i2.then(() => {
            e2(this.id);
          });
        }
        mount() {
          const { register: t2, onExitComplete: e2 } = this.node.presenceContext || {};
          e2 && e2(this.id), t2 && (this.unmount = t2(this.id));
        }
        unmount() {
        }
      } } };
      function xr(t2) {
        return { point: { x: t2.pageX, y: t2.pageY } };
      }
      const wr = (t2) => (e2) => wt(e2) && t2(e2, xr(e2));
      function Pr(t2, e2, n2, i2) {
        return io(t2, e2, wr(n2), i2);
      }
      const Sr = ({ current: t2 }) => t2 ? t2.ownerDocument.defaultView : null;
      function Tr(t2) {
        return t2 && "object" == typeof t2 && Object.prototype.hasOwnProperty.call(t2, "current");
      }
      const br = (t2, e2) => Math.abs(t2 - e2);
      function Ar(t2, e2) {
        const n2 = br(t2.x, e2.x), i2 = br(t2.y, e2.y);
        return Math.sqrt(n2 ** 2 + i2 ** 2);
      }
      class Er {
        constructor(t2, e2, { transformPagePoint: n2, contextWindow: i2, dragSnapToOrigin: s2 = false } = {}) {
          if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
            if (!this.lastMoveEvent || !this.lastMoveEventInfo) return;
            const t3 = Vr(this.lastMoveEventInfo, this.history), e3 = null !== this.startEvent, n3 = Ar(t3.offset, { x: 0, y: 0 }) >= 3;
            if (!e3 && !n3) return;
            const { point: i3 } = t3, { timestamp: s3 } = rt;
            this.history.push({ ...i3, timestamp: s3 });
            const { onStart: o3, onMove: r3 } = this.handlers;
            e3 || (o3 && o3(this.lastMoveEvent, t3), this.startEvent = this.lastMoveEvent), r3 && r3(this.lastMoveEvent, t3);
          }, this.handlePointerMove = (t3, e3) => {
            this.lastMoveEvent = t3, this.lastMoveEventInfo = Mr(e3, this.transformPagePoint), st.update(this.updatePoint, true);
          }, this.handlePointerUp = (t3, e3) => {
            this.end();
            const { onEnd: n3, onSessionEnd: i3, resumeAnimation: s3 } = this.handlers;
            if (this.dragSnapToOrigin && s3 && s3(), !this.lastMoveEvent || !this.lastMoveEventInfo) return;
            const o3 = Vr("pointercancel" === t3.type ? this.lastMoveEventInfo : Mr(e3, this.transformPagePoint), this.history);
            this.startEvent && n3 && n3(t3, o3), i3 && i3(t3, o3);
          }, !wt(t2)) return;
          this.dragSnapToOrigin = s2, this.handlers = e2, this.transformPagePoint = n2, this.contextWindow = i2 || window;
          const o2 = Mr(xr(t2), this.transformPagePoint), { point: r2 } = o2, { timestamp: a2 } = rt;
          this.history = [{ ...r2, timestamp: a2 }];
          const { onSessionStart: l2 } = e2;
          l2 && l2(t2, Vr(o2, this.history)), this.removeListeners = Ln(Pr(this.contextWindow, "pointermove", this.handlePointerMove), Pr(this.contextWindow, "pointerup", this.handlePointerUp), Pr(this.contextWindow, "pointercancel", this.handlePointerUp));
        }
        updateHandlers(t2) {
          this.handlers = t2;
        }
        end() {
          this.removeListeners && this.removeListeners(), ot(this.updatePoint);
        }
      }
      function Mr(t2, e2) {
        return e2 ? { point: e2(t2.point) } : t2;
      }
      function Cr(t2, e2) {
        return { x: t2.x - e2.x, y: t2.y - e2.y };
      }
      function Vr({ point: t2 }, e2) {
        return { point: t2, delta: Cr(t2, Dr(e2)), offset: Cr(t2, Rr(e2)), velocity: kr(e2, 0.1) };
      }
      function Rr(t2) {
        return t2[0];
      }
      function Dr(t2) {
        return t2[t2.length - 1];
      }
      function kr(t2, e2) {
        if (t2.length < 2) return { x: 0, y: 0 };
        let n2 = t2.length - 1, i2 = null;
        const s2 = Dr(t2);
        for (; n2 >= 0 && (i2 = t2[n2], !(s2.timestamp - i2.timestamp > j(e2))); ) n2--;
        if (!i2) return { x: 0, y: 0 };
        const o2 = I(s2.timestamp - i2.timestamp);
        if (0 === o2) return { x: 0, y: 0 };
        const r2 = { x: (s2.x - i2.x) / o2, y: (s2.y - i2.y) / o2 };
        return r2.x === 1 / 0 && (r2.x = 0), r2.y === 1 / 0 && (r2.y = 0), r2;
      }
      function Lr(t2, e2, n2) {
        return { min: void 0 !== e2 ? t2.min + e2 : void 0, max: void 0 !== n2 ? t2.max + n2 - (t2.max - t2.min) : void 0 };
      }
      function Br(t2, e2) {
        let n2 = e2.min - t2.min, i2 = e2.max - t2.max;
        return e2.max - e2.min < t2.max - t2.min && ([n2, i2] = [i2, n2]), { min: n2, max: i2 };
      }
      const Fr = 0.35;
      function Or(t2, e2, n2) {
        return { min: jr(t2, e2), max: jr(t2, n2) };
      }
      function jr(t2, e2) {
        return "number" == typeof t2 ? t2 : t2[e2] || 0;
      }
      const Ir = /* @__PURE__ */ new WeakMap();
      class Ur {
        constructor(t2) {
          this.openDragLock = null, this.isDragging = false, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = false, this.hasMutatedConstraints = false, this.elastic = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }, this.visualElement = t2;
        }
        start(t2, { snapToCursor: e2 = false } = {}) {
          const { presenceContext: n2 } = this.visualElement;
          if (n2 && false === n2.isPresent) return;
          const { dragSnapToOrigin: i2 } = this.getProps();
          this.panSession = new Er(t2, { onSessionStart: (t3) => {
            const { dragSnapToOrigin: n3 } = this.getProps();
            n3 ? this.pauseAnimation() : this.stopAnimation(), e2 && this.snapToCursor(xr(t3).point);
          }, onStart: (t3, e3) => {
            const { drag: n3, dragPropagation: i3, onDragStart: s2 } = this.getProps();
            if (n3 && !i3 && (this.openDragLock && this.openDragLock(), this.openDragLock = "x" === (o2 = n3) || "y" === o2 ? pt[o2] ? null : (pt[o2] = true, () => {
              pt[o2] = false;
            }) : pt.x || pt.y ? null : (pt.x = pt.y = true, () => {
              pt.x = pt.y = false;
            }), !this.openDragLock)) return;
            var o2;
            this.isDragging = true, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = true, this.visualElement.projection.target = void 0), Cs((t4) => {
              let e4 = this.getAxisMotionValue(t4).get() || 0;
              if (ge.test(e4)) {
                const { projection: n4 } = this.visualElement;
                if (n4 && n4.layout) {
                  const i4 = n4.layout.layoutBox[t4];
                  if (i4) {
                    e4 = Dt(i4) * (parseFloat(e4) / 100);
                  }
                }
              }
              this.originPoint[t4] = e4;
            }), s2 && st.postRender(() => s2(t3, e3)), nr(this.visualElement, "transform");
            const { animationState: r2 } = this.visualElement;
            r2 && r2.setActive("whileDrag", true);
          }, onMove: (t3, e3) => {
            const { dragPropagation: n3, dragDirectionLock: i3, onDirectionLock: s2, onDrag: o2 } = this.getProps();
            if (!n3 && !this.openDragLock) return;
            const { offset: r2 } = e3;
            if (i3 && null === this.currentDirection) return this.currentDirection = function(t4, e4 = 10) {
              let n4 = null;
              Math.abs(t4.y) > e4 ? n4 = "y" : Math.abs(t4.x) > e4 && (n4 = "x");
              return n4;
            }(r2), void (null !== this.currentDirection && s2 && s2(this.currentDirection));
            this.updateAxis("x", e3.point, r2), this.updateAxis("y", e3.point, r2), this.visualElement.render(), o2 && o2(t3, e3);
          }, onSessionEnd: (t3, e3) => this.stop(t3, e3), resumeAnimation: () => Cs((t3) => {
            var e3;
            return "paused" === this.getAnimationState(t3) && (null === (e3 = this.getAxisMotionValue(t3).animation) || void 0 === e3 ? void 0 : e3.play());
          }) }, { transformPagePoint: this.visualElement.getTransformPagePoint(), dragSnapToOrigin: i2, contextWindow: Sr(this.visualElement) });
        }
        stop(t2, e2) {
          const n2 = this.isDragging;
          if (this.cancel(), !n2) return;
          const { velocity: i2 } = e2;
          this.startAnimation(i2);
          const { onDragEnd: s2 } = this.getProps();
          s2 && st.postRender(() => s2(t2, e2));
        }
        cancel() {
          this.isDragging = false;
          const { projection: t2, animationState: e2 } = this.visualElement;
          t2 && (t2.isAnimationBlocked = false), this.panSession && this.panSession.end(), this.panSession = void 0;
          const { dragPropagation: n2 } = this.getProps();
          !n2 && this.openDragLock && (this.openDragLock(), this.openDragLock = null), e2 && e2.setActive("whileDrag", false);
        }
        updateAxis(t2, e2, n2) {
          const { drag: i2 } = this.getProps();
          if (!n2 || !Wr(t2, i2, this.currentDirection)) return;
          const s2 = this.getAxisMotionValue(t2);
          let o2 = this.originPoint[t2] + n2[t2];
          this.constraints && this.constraints[t2] && (o2 = function(t3, { min: e3, max: n3 }, i3) {
            return void 0 !== e3 && t3 < e3 ? t3 = i3 ? Rt(e3, t3, i3.min) : Math.max(t3, e3) : void 0 !== n3 && t3 > n3 && (t3 = i3 ? Rt(n3, t3, i3.max) : Math.min(t3, n3)), t3;
          }(o2, this.constraints[t2], this.elastic[t2])), s2.set(o2);
        }
        resolveConstraints() {
          var t2;
          const { dragConstraints: e2, dragElastic: n2 } = this.getProps(), i2 = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : null === (t2 = this.visualElement.projection) || void 0 === t2 ? void 0 : t2.layout, s2 = this.constraints;
          e2 && Tr(e2) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : this.constraints = !(!e2 || !i2) && function(t3, { top: e3, left: n3, bottom: i3, right: s3 }) {
            return { x: Lr(t3.x, n3, s3), y: Lr(t3.y, e3, i3) };
          }(i2.layoutBox, e2), this.elastic = function(t3 = Fr) {
            return false === t3 ? t3 = 0 : true === t3 && (t3 = Fr), { x: Or(t3, "left", "right"), y: Or(t3, "top", "bottom") };
          }(n2), s2 !== this.constraints && i2 && this.constraints && !this.hasMutatedConstraints && Cs((t3) => {
            false !== this.constraints && this.getAxisMotionValue(t3) && (this.constraints[t3] = function(t4, e3) {
              const n3 = {};
              return void 0 !== e3.min && (n3.min = e3.min - t4.min), void 0 !== e3.max && (n3.max = e3.max - t4.min), n3;
            }(i2.layoutBox[t3], this.constraints[t3]));
          });
        }
        resolveRefConstraints() {
          const { dragConstraints: t2, onMeasureDragConstraints: e2 } = this.getProps();
          if (!t2 || !Tr(t2)) return false;
          const n2 = t2.current, { projection: i2 } = this.visualElement;
          if (!i2 || !i2.layout) return false;
          const s2 = function(t3, e3, n3) {
            const i3 = ho(t3, n3), { scroll: s3 } = e3;
            return s3 && (us(i3.x, s3.offset.x), us(i3.y, s3.offset.y)), i3;
          }(n2, i2.root, this.visualElement.getTransformPagePoint());
          let o2 = function(t3, e3) {
            return { x: Br(t3.x, e3.x), y: Br(t3.y, e3.y) };
          }(i2.layout.layoutBox, s2);
          if (e2) {
            const t3 = e2(function({ x: t4, y: e3 }) {
              return { top: e3.min, right: t4.max, bottom: e3.max, left: t4.min };
            }(o2));
            this.hasMutatedConstraints = !!t3, t3 && (o2 = co(t3));
          }
          return o2;
        }
        startAnimation(t2) {
          const { drag: e2, dragMomentum: n2, dragElastic: i2, dragTransition: s2, dragSnapToOrigin: o2, onDragTransitionEnd: r2 } = this.getProps(), a2 = this.constraints || {}, l2 = Cs((r3) => {
            if (!Wr(r3, e2, this.currentDirection)) return;
            let l3 = a2 && a2[r3] || {};
            o2 && (l3 = { min: 0, max: 0 });
            const u2 = i2 ? 200 : 1e6, c2 = i2 ? 40 : 1e7, h2 = { type: "inertia", velocity: n2 ? t2[r3] : 0, bounceStiffness: u2, bounceDamping: c2, timeConstant: 750, restDelta: 1, restSpeed: 10, ...s2, ...l3 };
            return this.startAxisValueAnimation(r3, h2);
          });
          return Promise.all(l2).then(r2);
        }
        startAxisValueAnimation(t2, e2) {
          const n2 = this.getAxisMotionValue(t2);
          return nr(this.visualElement, t2), n2.start(ki(t2, n2, 0, e2, this.visualElement, false));
        }
        stopAnimation() {
          Cs((t2) => this.getAxisMotionValue(t2).stop());
        }
        pauseAnimation() {
          Cs((t2) => {
            var e2;
            return null === (e2 = this.getAxisMotionValue(t2).animation) || void 0 === e2 ? void 0 : e2.pause();
          });
        }
        getAnimationState(t2) {
          var e2;
          return null === (e2 = this.getAxisMotionValue(t2).animation) || void 0 === e2 ? void 0 : e2.state;
        }
        getAxisMotionValue(t2) {
          const e2 = "_drag" + t2.toUpperCase(), n2 = this.visualElement.getProps(), i2 = n2[e2];
          return i2 || this.visualElement.getValue(t2, (n2.initial ? n2.initial[t2] : void 0) || 0);
        }
        snapToCursor(t2) {
          Cs((e2) => {
            const { drag: n2 } = this.getProps();
            if (!Wr(e2, n2, this.currentDirection)) return;
            const { projection: i2 } = this.visualElement, s2 = this.getAxisMotionValue(e2);
            if (i2 && i2.layout) {
              const { min: n3, max: o2 } = i2.layout.layoutBox[e2];
              s2.set(t2[e2] - Rt(n3, o2, 0.5));
            }
          });
        }
        scalePositionWithinConstraints() {
          if (!this.visualElement.current) return;
          const { drag: t2, dragConstraints: e2 } = this.getProps(), { projection: n2 } = this.visualElement;
          if (!Tr(e2) || !n2 || !this.constraints) return;
          this.stopAnimation();
          const i2 = { x: 0, y: 0 };
          Cs((t3) => {
            const e3 = this.getAxisMotionValue(t3);
            if (e3 && false !== this.constraints) {
              const n3 = e3.get();
              i2[t3] = function(t4, e4) {
                let n4 = 0.5;
                const i3 = Dt(t4), s3 = Dt(e4);
                return s3 > i3 ? n4 = F(e4.min, e4.max - i3, t4.min) : i3 > s3 && (n4 = F(t4.min, t4.max - s3, e4.min)), ne(0, 1, n4);
              }({ min: n3, max: n3 }, this.constraints[t3]);
            }
          });
          const { transformTemplate: s2 } = this.visualElement.getProps();
          this.visualElement.current.style.transform = s2 ? s2({}, "") : "none", n2.root && n2.root.updateScroll(), n2.updateLayout(), this.resolveConstraints(), Cs((e3) => {
            if (!Wr(e3, t2, null)) return;
            const n3 = this.getAxisMotionValue(e3), { min: s3, max: o2 } = this.constraints[e3];
            n3.set(Rt(s3, o2, i2[e3]));
          });
        }
        addListeners() {
          if (!this.visualElement.current) return;
          Ir.set(this.visualElement, this);
          const t2 = Pr(this.visualElement.current, "pointerdown", (t3) => {
            const { drag: e3, dragListener: n3 = true } = this.getProps();
            e3 && n3 && this.start(t3);
          }), e2 = () => {
            const { dragConstraints: t3 } = this.getProps();
            Tr(t3) && t3.current && (this.constraints = this.resolveRefConstraints());
          }, { projection: n2 } = this.visualElement, i2 = n2.addEventListener("measure", e2);
          n2 && !n2.layout && (n2.root && n2.root.updateScroll(), n2.updateLayout()), st.read(e2);
          const s2 = io(window, "resize", () => this.scalePositionWithinConstraints()), o2 = n2.addEventListener("didUpdate", ({ delta: t3, hasLayoutChanged: e3 }) => {
            this.isDragging && e3 && (Cs((e4) => {
              const n3 = this.getAxisMotionValue(e4);
              n3 && (this.originPoint[e4] += t3[e4].translate, n3.set(n3.get() + t3[e4].translate));
            }), this.visualElement.render());
          });
          return () => {
            s2(), t2(), i2(), o2 && o2();
          };
        }
        getProps() {
          const t2 = this.visualElement.getProps(), { drag: e2 = false, dragDirectionLock: n2 = false, dragPropagation: i2 = false, dragConstraints: s2 = false, dragElastic: o2 = Fr, dragMomentum: r2 = true } = t2;
          return { ...t2, drag: e2, dragDirectionLock: n2, dragPropagation: i2, dragConstraints: s2, dragElastic: o2, dragMomentum: r2 };
        }
      }
      function Wr(t2, e2, n2) {
        return !(true !== e2 && e2 !== t2 || null !== n2 && n2 !== t2);
      }
      const Nr = (t2) => (e2, n2) => {
        t2 && st.postRender(() => t2(e2, n2));
      };
      const zr = e.createContext({});
      class $r extends e.Component {
        componentDidMount() {
          const { visualElement: t2, layoutGroup: e2, switchLayoutGroup: n2, layoutId: i2 } = this.props, { projection: s2 } = t2;
          Ms(Xr), s2 && (e2.group && e2.group.add(s2), n2 && n2.register && i2 && n2.register(s2), s2.root.didUpdate(), s2.addEventListener("animationComplete", () => {
            this.safeToRemove();
          }), s2.setOptions({ ...s2.options, onExitComplete: () => this.safeToRemove() })), Vs.hasEverUpdated = true;
        }
        getSnapshotBeforeUpdate(t2) {
          const { layoutDependency: e2, visualElement: n2, drag: i2, isPresent: s2 } = this.props, o2 = n2.projection;
          return o2 ? (o2.isPresent = s2, i2 || t2.layoutDependency !== e2 || void 0 === e2 || t2.isPresent !== s2 ? o2.willUpdate() : this.safeToRemove(), t2.isPresent !== s2 && (s2 ? o2.promote() : o2.relegate() || st.postRender(() => {
            const t3 = o2.getStack();
            t3 && t3.members.length || this.safeToRemove();
          })), null) : null;
        }
        componentDidUpdate() {
          const { projection: t2 } = this.props.visualElement;
          t2 && (t2.root.didUpdate(), lt.postRender(() => {
            !t2.currentAnimation && t2.isLead() && this.safeToRemove();
          }));
        }
        componentWillUnmount() {
          const { visualElement: t2, layoutGroup: e2, switchLayoutGroup: n2 } = this.props, { projection: i2 } = t2;
          i2 && (i2.scheduleCheckAfterUnmount(), e2 && e2.group && e2.group.remove(i2), n2 && n2.deregister && n2.deregister(i2));
        }
        safeToRemove() {
          const { safeToRemove: t2 } = this.props;
          t2 && t2();
        }
        render() {
          return null;
        }
      }
      function Hr(t2) {
        const [n2, i2] = b(), s2 = e.useContext(m);
        return d($r, { ...t2, layoutGroup: s2, switchLayoutGroup: e.useContext(zr), isPresent: n2, safeToRemove: i2 });
      }
      const Xr = { borderRadius: { ...lo, applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"] }, borderTopLeftRadius: lo, borderTopRightRadius: lo, borderBottomLeftRadius: lo, borderBottomRightRadius: lo, boxShadow: uo }, Yr = { pan: { Feature: class extends gr {
        constructor() {
          super(...arguments), this.removePointerDownListener = R;
        }
        onPointerDown(t2) {
          this.session = new Er(t2, this.createPanHandlers(), { transformPagePoint: this.node.getTransformPagePoint(), contextWindow: Sr(this.node) });
        }
        createPanHandlers() {
          const { onPanSessionStart: t2, onPanStart: e2, onPan: n2, onPanEnd: i2 } = this.node.getProps();
          return { onSessionStart: Nr(t2), onStart: Nr(e2), onMove: n2, onEnd: (t3, e3) => {
            delete this.session, i2 && st.postRender(() => i2(t3, e3));
          } };
        }
        mount() {
          this.removePointerDownListener = Pr(this.node.current, "pointerdown", (t2) => this.onPointerDown(t2));
        }
        update() {
          this.session && this.session.updateHandlers(this.createPanHandlers());
        }
        unmount() {
          this.removePointerDownListener(), this.session && this.session.end();
        }
      } }, drag: { Feature: class extends gr {
        constructor(t2) {
          super(t2), this.removeGroupControls = R, this.removeListeners = R, this.controls = new Ur(t2);
        }
        mount() {
          const { dragControls: t2 } = this.node.getProps();
          t2 && (this.removeGroupControls = t2.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || R;
        }
        unmount() {
          this.removeGroupControls(), this.removeListeners();
        }
      }, ProjectionNode: ro, MeasureLayout: Hr } };
      function Kr(t2, e2, n2) {
        const { props: i2 } = t2;
        t2.animationState && i2.whileHover && t2.animationState.setActive("whileHover", "Start" === n2);
        const s2 = i2["onHover" + n2];
        s2 && st.postRender(() => s2(e2, xr(e2)));
      }
      function Gr(t2, e2, n2) {
        const { props: i2 } = t2;
        if (t2.current instanceof HTMLButtonElement && t2.current.disabled) return;
        t2.animationState && i2.whileTap && t2.animationState.setActive("whileTap", "Start" === n2);
        const s2 = i2["onTap" + ("End" === n2 ? "" : n2)];
        s2 && st.postRender(() => s2(e2, xr(e2)));
      }
      const _r = /* @__PURE__ */ new WeakMap(), qr = /* @__PURE__ */ new WeakMap(), Zr = (t2) => {
        const e2 = _r.get(t2.target);
        e2 && e2(t2);
      }, Jr = (t2) => {
        t2.forEach(Zr);
      };
      function Qr(t2, e2, n2) {
        const i2 = function({ root: t3, ...e3 }) {
          const n3 = t3 || document;
          qr.has(n3) || qr.set(n3, {});
          const i3 = qr.get(n3), s2 = JSON.stringify(e3);
          return i3[s2] || (i3[s2] = new IntersectionObserver(Jr, { root: t3, ...e3 })), i3[s2];
        }(e2);
        return _r.set(t2, n2), i2.observe(t2), () => {
          _r.delete(t2), i2.unobserve(t2);
        };
      }
      const ta = { some: 0, all: 1 };
      const ea = { inView: { Feature: class extends gr {
        constructor() {
          super(...arguments), this.hasEnteredView = false, this.isInView = false;
        }
        startObserver() {
          this.unmount();
          const { viewport: t2 = {} } = this.node.getProps(), { root: e2, margin: n2, amount: i2 = "some", once: s2 } = t2, o2 = { root: e2 ? e2.current : void 0, rootMargin: n2, threshold: "number" == typeof i2 ? i2 : ta[i2] };
          return Qr(this.node.current, o2, (t3) => {
            const { isIntersecting: e3 } = t3;
            if (this.isInView === e3) return;
            if (this.isInView = e3, s2 && !e3 && this.hasEnteredView) return;
            e3 && (this.hasEnteredView = true), this.node.animationState && this.node.animationState.setActive("whileInView", e3);
            const { onViewportEnter: n3, onViewportLeave: i3 } = this.node.getProps(), o3 = e3 ? n3 : i3;
            o3 && o3(t3);
          });
        }
        mount() {
          this.startObserver();
        }
        update() {
          if ("undefined" == typeof IntersectionObserver) return;
          const { props: t2, prevProps: e2 } = this.node;
          ["amount", "margin", "root"].some(function({ viewport: t3 = {} }, { viewport: e3 = {} } = {}) {
            return (n2) => t3[n2] !== e3[n2];
          }(t2, e2)) && this.startObserver();
        }
        unmount() {
        }
      } }, tap: { Feature: class extends gr {
        mount() {
          const { current: t2 } = this.node;
          t2 && (this.unmount = Et(t2, (t3, e2) => (Gr(this.node, e2, "Start"), (t4, { success: e3 }) => Gr(this.node, t4, e3 ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
        }
        unmount() {
        }
      } }, focus: { Feature: class extends gr {
        constructor() {
          super(...arguments), this.isActive = false;
        }
        onFocus() {
          let t2 = false;
          try {
            t2 = this.node.current.matches(":focus-visible");
          } catch (e2) {
            t2 = true;
          }
          t2 && this.node.animationState && (this.node.animationState.setActive("whileFocus", true), this.isActive = true);
        }
        onBlur() {
          this.isActive && this.node.animationState && (this.node.animationState.setActive("whileFocus", false), this.isActive = false);
        }
        mount() {
          this.unmount = Ln(io(this.node.current, "focus", () => this.onFocus()), io(this.node.current, "blur", () => this.onBlur()));
        }
        unmount() {
        }
      } }, hover: { Feature: class extends gr {
        mount() {
          const { current: t2 } = this.node;
          t2 && (this.unmount = vt(t2, (t3, e2) => (Kr(this.node, e2, "Start"), (t4) => Kr(this.node, t4, "End"))));
        }
        unmount() {
        }
      } } }, na = { layout: { ProjectionNode: ro, MeasureLayout: Hr } }, ia = e.createContext({});
      function sa(t2) {
        const { initial: n2, animate: i2 } = function(t3, e2) {
          if (bo(t3)) {
            const { initial: e3, animate: n3 } = t3;
            return { initial: false === e3 || Po(e3) ? e3 : void 0, animate: Po(n3) ? n3 : void 0 };
          }
          return false !== t3.inherit ? e2 : {};
        }(t2, e.useContext(ia));
        return e.useMemo(() => ({ initial: n2, animate: i2 }), [oa(n2), oa(i2)]);
      }
      function oa(t2) {
        return Array.isArray(t2) ? t2.join(" ") : t2;
      }
      const ra = Symbol.for("motionComponentSymbol");
      function aa(t2, n2, i2) {
        return e.useCallback((e2) => {
          e2 && t2.onMount && t2.onMount(e2), n2 && (e2 ? n2.mount(e2) : n2.unmount()), i2 && ("function" == typeof i2 ? i2(e2) : Tr(i2) && (i2.current = e2));
        }, [n2]);
      }
      function la(t2, n2, i2, s2, o2) {
        var r2, a2;
        const { visualElement: l2 } = e.useContext(ia), u2 = e.useContext($o), c2 = e.useContext(v), h2 = e.useContext(x).reducedMotion, d2 = e.useRef(null);
        s2 = s2 || u2.renderer, !d2.current && s2 && (d2.current = s2(t2, { visualState: n2, parent: l2, props: i2, presenceContext: c2, blockInitialAnimation: !!c2 && false === c2.initial, reducedMotionConfig: h2 }));
        const p2 = d2.current, m2 = e.useContext(zr);
        !p2 || p2.projection || !o2 || "html" !== p2.type && "svg" !== p2.type || function(t3, e2, n3, i3) {
          const { layoutId: s3, layout: o3, drag: r3, dragConstraints: a3, layoutScroll: l3, layoutRoot: u3 } = e2;
          t3.projection = new n3(t3.latestValues, e2["data-framer-portal-id"] ? void 0 : function t4(e3) {
            return e3 ? false !== e3.options.allowProjection ? e3.projection : t4(e3.parent) : void 0;
          }(t3.parent)), t3.projection.setOptions({ layoutId: s3, layout: o3, alwaysMeasureLayout: Boolean(r3) || a3 && Tr(a3), visualElement: t3, animationType: "string" == typeof o3 ? o3 : "both", initialPromotionConfig: i3, layoutScroll: l3, layoutRoot: u3 });
        }(d2.current, i2, o2, m2);
        const f2 = e.useRef(false);
        e.useInsertionEffect(() => {
          p2 && f2.current && p2.update(i2, c2);
        });
        const g2 = i2[Fi], w2 = e.useRef(Boolean(g2) && !(null === (r2 = window.MotionHandoffIsComplete) || void 0 === r2 ? void 0 : r2.call(window, g2)) && (null === (a2 = window.MotionHasOptimisedAnimation) || void 0 === a2 ? void 0 : a2.call(window, g2)));
        return y(() => {
          p2 && (f2.current = true, window.MotionIsMounted = true, p2.updateFeatures(), lt.render(p2.render), w2.current && p2.animationState && p2.animationState.animateChanges());
        }), e.useEffect(() => {
          p2 && (!w2.current && p2.animationState && p2.animationState.animateChanges(), w2.current && (queueMicrotask(() => {
            var t3;
            null === (t3 = window.MotionHandoffMarkAsComplete) || void 0 === t3 || t3.call(window, g2);
          }), w2.current = false));
        }), p2;
      }
      function ua({ preloadedFeatures: t2, createVisualElement: n2, useRender: i2, useVisualState: s2, Component: o2 }) {
        var r2, a2;
        function l2(t3, r3) {
          let a3;
          const l3 = { ...e.useContext(x), ...t3, layoutId: ca(t3) }, { isStatic: u3 } = l3, c2 = sa(t3), h2 = s2(t3, u3);
          if (!u3 && g) {
            e.useContext($o).strict;
            const t4 = function(t5) {
              const { drag: e2, layout: n3 } = mo;
              if (!e2 && !n3) return {};
              const i3 = { ...e2, ...n3 };
              return { MeasureLayout: (null == e2 ? void 0 : e2.isEnabled(t5)) || (null == n3 ? void 0 : n3.isEnabled(t5)) ? i3.MeasureLayout : void 0, ProjectionNode: i3.ProjectionNode };
            }(l3);
            a3 = t4.MeasureLayout, c2.visualElement = la(o2, h2, l3, n2, t4.ProjectionNode);
          }
          return p(ia.Provider, { value: c2, children: [a3 && c2.visualElement ? d(a3, { visualElement: c2.visualElement, ...l3 }) : null, i2(o2, t3, aa(h2, c2.visualElement, r3), h2, u3, c2.visualElement)] });
        }
        t2 && Ho(t2), l2.displayName = "motion." + ("string" == typeof o2 ? o2 : `create(${null !== (a2 = null !== (r2 = o2.displayName) && void 0 !== r2 ? r2 : o2.name) && void 0 !== a2 ? a2 : ""})`);
        const u2 = e.forwardRef(l2);
        return u2[ra] = o2, u2;
      }
      function ca({ layoutId: t2 }) {
        const n2 = e.useContext(m).id;
        return n2 && void 0 !== t2 ? n2 + "-" + t2 : t2;
      }
      const ha = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
      function da(t2, e2, n2) {
        for (const i2 in e2) Ut(e2[i2]) || jo(i2, n2) || (t2[i2] = e2[i2]);
      }
      function pa(t2, n2) {
        const i2 = {};
        return da(i2, t2.style || {}, t2), Object.assign(i2, function({ transformTemplate: t3 }, n3) {
          return e.useMemo(() => {
            const e2 = { style: {}, transform: {}, transformOrigin: {}, vars: {} };
            return Fo(e2, n3, t3), Object.assign({}, e2.vars, e2.style);
          }, [n3]);
        }(t2, n2)), i2;
      }
      function ma(t2, e2) {
        const n2 = {}, i2 = pa(t2, e2);
        return t2.drag && false !== t2.dragListener && (n2.draggable = false, i2.userSelect = i2.WebkitUserSelect = i2.WebkitTouchCallout = "none", i2.touchAction = true === t2.drag ? "none" : "pan-" + ("x" === t2.drag ? "y" : "x")), void 0 === t2.tabIndex && (t2.onTap || t2.onTapStart || t2.whileTap) && (n2.tabIndex = 0), n2.style = i2, n2;
      }
      const fa = ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "switch", "symbol", "svg", "text", "tspan", "use", "view"];
      function ga(t2) {
        return "string" == typeof t2 && !t2.includes("-") && !!(fa.indexOf(t2) > -1 || /[A-Z]/u.test(t2));
      }
      const ya = { offset: "stroke-dashoffset", array: "stroke-dasharray" }, va = { offset: "strokeDashoffset", array: "strokeDasharray" };
      function xa(t2, e2, n2) {
        return "string" == typeof t2 ? t2 : ye.transform(e2 + n2 * t2);
      }
      function wa(t2, { attrX: e2, attrY: n2, attrScale: i2, originX: s2, originY: o2, pathLength: r2, pathSpacing: a2 = 1, pathOffset: l2 = 0, ...u2 }, c2, h2) {
        if (Fo(t2, u2, h2), c2) return void (t2.style.viewBox && (t2.attrs.viewBox = t2.style.viewBox));
        t2.attrs = t2.style, t2.style = {};
        const { attrs: d2, style: p2, dimensions: m2 } = t2;
        d2.transform && (m2 && (p2.transform = d2.transform), delete d2.transform), m2 && (void 0 !== s2 || void 0 !== o2 || p2.transform) && (p2.transformOrigin = function(t3, e3, n3) {
          return `${xa(e3, t3.x, t3.width)} ${xa(n3, t3.y, t3.height)}`;
        }(m2, void 0 !== s2 ? s2 : 0.5, void 0 !== o2 ? o2 : 0.5)), void 0 !== e2 && (d2.x = e2), void 0 !== n2 && (d2.y = n2), void 0 !== i2 && (d2.scale = i2), void 0 !== r2 && function(t3, e3, n3 = 1, i3 = 0, s3 = true) {
          t3.pathLength = 1;
          const o3 = s3 ? ya : va;
          t3[o3.offset] = ye.transform(-i3);
          const r3 = ye.transform(e3), a3 = ye.transform(n3);
          t3[o3.array] = `${r3} ${a3}`;
        }(d2, r2, a2, l2, false);
      }
      const Pa = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {}, attrs: {} }), Sa = (t2) => "string" == typeof t2 && "svg" === t2.toLowerCase();
      function Ta(t2, n2, i2, s2) {
        const o2 = e.useMemo(() => {
          const e2 = { style: {}, transform: {}, transformOrigin: {}, vars: {}, attrs: {} };
          return wa(e2, n2, Sa(s2), t2.transformTemplate), { ...e2.attrs, style: { ...e2.style } };
        }, [n2]);
        if (t2.style) {
          const e2 = {};
          da(e2, t2.style, t2), o2.style = { ...e2, ...o2.style };
        }
        return o2;
      }
      function ba(t2 = false) {
        return (n2, i2, s2, { latestValues: o2 }, r2) => {
          const a2 = (ga(n2) ? Ta : ma)(i2, o2, r2, n2), l2 = qo(i2, "string" == typeof n2, t2), u2 = n2 !== e.Fragment ? { ...l2, ...a2, ref: s2 } : {}, { children: c2 } = i2, h2 = e.useMemo(() => Ut(c2) ? c2.get() : c2, [c2]);
          return e.createElement(n2, { ...u2, children: h2 });
        };
      }
      const Aa = (t2) => (n2, i2) => {
        const s2 = e.useContext(ia), o2 = e.useContext(v), r2 = () => function({ scrapeMotionValuesFromProps: t3, createRenderState: e2, onUpdate: n3 }, i3, s3, o3) {
          const r3 = { latestValues: Ea(i3, s3, o3, t3), renderState: e2() };
          return n3 && (r3.onMount = (t4) => n3({ props: i3, current: t4, ...r3 }), r3.onUpdate = (t4) => n3(t4)), r3;
        }(t2, n2, s2, o2);
        return i2 ? r2() : f(r2);
      };
      function Ea(t2, e2, n2, i2) {
        const s2 = {}, o2 = i2(t2, {});
        for (const t3 in o2) s2[t3] = zi(o2[t3]);
        let { initial: r2, animate: a2 } = t2;
        const l2 = bo(t2), u2 = Ao(t2);
        e2 && u2 && !l2 && false !== t2.inherit && (void 0 === r2 && (r2 = e2.initial), void 0 === a2 && (a2 = e2.animate));
        let c2 = !!n2 && false === n2.initial;
        c2 = c2 || false === r2;
        const h2 = c2 ? a2 : r2;
        if (h2 && "boolean" != typeof h2 && !wo(h2)) {
          const e3 = Array.isArray(h2) ? h2 : [h2];
          for (let n3 = 0; n3 < e3.length; n3++) {
            const i3 = Mo(t2, e3[n3]);
            if (i3) {
              const { transitionEnd: t3, transition: e4, ...n4 } = i3;
              for (const t4 in n4) {
                let e5 = n4[t4];
                if (Array.isArray(e5)) {
                  e5 = e5[c2 ? e5.length - 1 : 0];
                }
                null !== e5 && (s2[t4] = e5);
              }
              for (const e5 in t3) s2[e5] = t3[e5];
            }
          }
        }
        return s2;
      }
      const Ma = { useVisualState: Aa({ scrapeMotionValuesFromProps: Io, createRenderState: ha }) };
      function Ca(t2, e2) {
        try {
          e2.dimensions = "function" == typeof t2.getBBox ? t2.getBBox() : t2.getBoundingClientRect();
        } catch (t3) {
          e2.dimensions = { x: 0, y: 0, width: 0, height: 0 };
        }
      }
      const Va = /* @__PURE__ */ new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes", "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale", "specularConstant", "specularExponent", "stdDeviation", "tableValues", "viewBox", "gradientTransform", "pathLength", "startOffset", "textLength", "lengthAdjust"]);
      function Ra(t2, e2, n2, i2) {
        Oo(t2, e2, void 0, i2);
        for (const n3 in e2.attrs) t2.setAttribute(Va.has(n3) ? n3 : Bi(n3), e2.attrs[n3]);
      }
      function Da(t2, e2, n2) {
        const i2 = Io(t2, e2, n2);
        for (const n3 in t2) if (Ut(t2[n3]) || Ut(e2[n3])) {
          i2[-1 !== Qt.indexOf(n3) ? "attr" + n3.charAt(0).toUpperCase() + n3.substring(1) : n3] = t2[n3];
        }
        return i2;
      }
      const ka = ["x", "y", "width", "height", "cx", "cy", "r"], La = { useVisualState: Aa({ scrapeMotionValuesFromProps: Da, createRenderState: Pa, onUpdate: ({ props: t2, prevProps: e2, current: n2, renderState: i2, latestValues: s2 }) => {
        if (!n2) return;
        let o2 = !!t2.drag;
        if (!o2) {
          for (const t3 in s2) if (te.has(t3)) {
            o2 = true;
            break;
          }
        }
        if (!o2) return;
        let r2 = !e2;
        if (e2) for (let n3 = 0; n3 < ka.length; n3++) {
          const i3 = ka[n3];
          t2[i3] !== e2[i3] && (r2 = true);
        }
        r2 && st.read(() => {
          Ca(n2, i2), st.render(() => {
            wa(i2, s2, Sa(n2.tagName), t2.transformTemplate), Ra(n2, i2);
          });
        });
      } }) };
      function Ba(t2, e2) {
        return function(n2, { forwardMotionProps: i2 } = { forwardMotionProps: false }) {
          return ua({ ...ga(n2) ? La : Ma, preloadedFeatures: t2, useRender: ba(i2), createVisualElement: e2, Component: n2 });
        };
      }
      class Fa extends Ro {
        constructor() {
          super(...arguments), this.type = "svg", this.isSVGTag = false, this.measureInstanceViewportBox = ys, this.updateDimensions = () => {
            this.current && !this.renderState.dimensions && Ca(this.current, this.renderState);
          };
        }
        getBaseTargetFromProps(t2, e2) {
          return t2[e2];
        }
        readValueFromInstance(t2, e2) {
          if (te.has(e2)) {
            const t3 = Ue(e2);
            return t3 && t3.default || 0;
          }
          return e2 = Va.has(e2) ? e2 : Bi(e2), t2.getAttribute(e2);
        }
        scrapeMotionValuesFromProps(t2, e2, n2) {
          return Da(t2, e2, n2);
        }
        onBindTransform() {
          this.current && !this.renderState.dimensions && st.postRender(this.updateDimensions);
        }
        build(t2, e2, n2) {
          wa(t2, e2, this.isSVGTag, n2.transformTemplate);
        }
        renderInstance(t2, e2, n2, i2) {
          Ra(t2, e2, 0, i2);
        }
        mount(t2) {
          this.isSVGTag = Sa(t2.tagName), super.mount(t2);
        }
      }
      const Oa = (t2, n2) => ga(t2) ? new Fa(n2) : new Uo(n2, { allowProjection: t2 !== e.Fragment }), ja = Jo(Ba({ ...vr, ...ea, ...Yr, ...na }, Oa));
      function Ia({ children: t2, as: n2 = "ul", axis: i2 = "y", onReorder: s2, values: o2, ...r2 }, a2) {
        const l2 = f(() => ja[n2]), u2 = [], c2 = e.useRef(false), h2 = { axis: i2, registerItem: (t3, e2) => {
          const n3 = u2.findIndex((e3) => t3 === e3.value);
          -1 !== n3 ? u2[n3].layout = e2[i2] : u2.push({ value: t3, layout: e2[i2] }), u2.sort(Na);
        }, updateOrder: (t3, e2, n3) => {
          if (c2.current) return;
          const i3 = function(t4, e3, n4, i4) {
            if (!i4) return t4;
            const s3 = t4.findIndex((t5) => t5.value === e3);
            if (-1 === s3) return t4;
            const o3 = i4 > 0 ? 1 : -1, r3 = t4[s3 + o3];
            if (!r3) return t4;
            const a3 = t4[s3], l3 = r3.layout, u3 = Rt(l3.min, l3.max, 0.5);
            return 1 === o3 && a3.layout.max + n4 > u3 || -1 === o3 && a3.layout.min + n4 < u3 ? function([...t5], e4, n5) {
              const i5 = e4 < 0 ? t5.length + e4 : e4;
              if (i5 >= 0 && i5 < t5.length) {
                const i6 = n5 < 0 ? t5.length + n5 : n5, [s4] = t5.splice(e4, 1);
                t5.splice(i6, 0, s4);
              }
              return t5;
            }(t4, s3, s3 + o3) : t4;
          }(u2, t3, e2, n3);
          u2 !== i3 && (c2.current = true, s2(i3.map(Wa).filter((t4) => -1 !== o2.indexOf(t4))));
        } };
        return e.useEffect(() => {
          c2.current = false;
        }), d(l2, { ...r2, ref: a2, ignoreStrict: true, children: d(Zo.Provider, { value: h2, children: t2 }) });
      }
      const Ua = e.forwardRef(Ia);
      function Wa(t2) {
        return t2.value;
      }
      function Na(t2, e2) {
        return t2.layout.min - e2.layout.min;
      }
      function za(t2) {
        const n2 = f(() => Vt(t2)), { isStatic: i2 } = e.useContext(x);
        if (i2) {
          const [, i3] = e.useState(t2);
          e.useEffect(() => n2.on("change", i3), []);
        }
        return n2;
      }
      function $a(...t2) {
        const e2 = !Array.isArray(t2[0]), n2 = e2 ? 0 : -1, i2 = t2[0 + n2], s2 = t2[1 + n2], o2 = t2[2 + n2], r2 = t2[3 + n2], a2 = mi(s2, o2, { mixer: (l2 = o2[0], ((t3) => t3 && "object" == typeof t3 && t3.mix)(l2) ? l2.mix : void 0), ...r2 });
        var l2;
        return e2 ? a2(i2) : a2;
      }
      function Ha(t2, e2) {
        const n2 = za(e2()), i2 = () => n2.set(e2());
        return i2(), y(() => {
          const e3 = () => st.preRender(i2, false, true), n3 = t2.map((t3) => t3.on("change", e3));
          return () => {
            n3.forEach((t3) => t3()), ot(i2);
          };
        }), n2;
      }
      function Xa(t2, e2, n2, i2) {
        if ("function" == typeof t2) return function(t3) {
          Mt.current = [], t3();
          const e3 = Ha(Mt.current, t3);
          return Mt.current = void 0, e3;
        }(t2);
        const s2 = "function" == typeof e2 ? e2 : $a(e2, n2, i2);
        return Array.isArray(t2) ? Ya(t2, s2) : Ya([t2], ([t3]) => s2(t3));
      }
      function Ya(t2, e2) {
        const n2 = f(() => []);
        return Ha(t2, () => {
          n2.length = 0;
          const i2 = t2.length;
          for (let e3 = 0; e3 < i2; e3++) n2[e3] = t2[e3].get();
          return e2(n2);
        });
      }
      function Ka(t2, e2 = 0) {
        return Ut(t2) ? t2 : za(e2);
      }
      function Ga({ children: t2, style: n2 = {}, value: i2, as: s2 = "li", onDrag: o2, layout: r2 = true, ...a2 }, l2) {
        const u2 = f(() => ja[s2]), c2 = e.useContext(Zo), h2 = { x: Ka(n2.x), y: Ka(n2.y) }, p2 = Xa([h2.x, h2.y], ([t3, e2]) => t3 || e2 ? 1 : "unset"), { axis: m2, registerItem: g2, updateOrder: y2 } = c2;
        return d(u2, { drag: m2, ...a2, dragSnapToOrigin: true, style: { ...n2, x: h2.x, y: h2.y, zIndex: p2 }, layout: r2, onDrag: (t3, e2) => {
          const { velocity: n3 } = e2;
          n3[m2] && y2(i2, h2[m2].get(), n3[m2]), o2 && o2(t3, e2);
        }, onLayoutMeasure: (t3) => g2(i2, t3), ref: l2, ignoreStrict: true, children: t2 });
      }
      const _a = e.forwardRef(Ga);
      var qa = Object.freeze({ __proto__: null, Group: Ua, Item: _a });
      const Za = (t2, e2, n2) => {
        const i2 = e2 - t2;
        return ((n2 - t2) % i2 + i2) % i2 + t2;
      };
      function Ja(t2, e2) {
        return hi(t2) ? t2[Za(0, t2.length, e2)] : t2;
      }
      function Qa(t2) {
        return "object" == typeof t2 && !Array.isArray(t2);
      }
      function tl(t2, e2, n2, i2) {
        return "string" == typeof t2 && Qa(e2) ? ft(t2, n2, i2) : t2 instanceof NodeList ? Array.from(t2) : Array.isArray(t2) ? t2 : [t2];
      }
      function el(t2, e2, n2) {
        return t2 * (e2 + 1);
      }
      function nl(t2, e2, n2, i2) {
        var s2;
        return "number" == typeof e2 ? e2 : e2.startsWith("-") || e2.startsWith("+") ? Math.max(0, t2 + parseFloat(e2)) : "<" === e2 ? n2 : null !== (s2 = i2.get(e2)) && void 0 !== s2 ? s2 : t2;
      }
      function il(t2, e2, n2, i2, s2, o2) {
        !function(t3, e3, n3) {
          for (let i3 = 0; i3 < t3.length; i3++) {
            const s3 = t3[i3];
            s3.at > e3 && s3.at < n3 && (V(t3, s3), i3--);
          }
        }(t2, s2, o2);
        for (let r2 = 0; r2 < e2.length; r2++) t2.push({ value: e2[r2], at: Rt(s2, o2, i2[r2]), easing: Ja(n2, r2) });
      }
      function sl(t2, e2) {
        for (let n2 = 0; n2 < t2.length; n2++) t2[n2] = t2[n2] / (e2 + 1);
      }
      function ol(t2, e2) {
        return t2.at === e2.at ? null === t2.value ? 1 : null === e2.value ? -1 : 0 : t2.at - e2.at;
      }
      function rl(t2, e2) {
        return !e2.has(t2) && e2.set(t2, {}), e2.get(t2);
      }
      function al(t2, e2) {
        return e2[t2] || (e2[t2] = []), e2[t2];
      }
      function ll(t2) {
        return Array.isArray(t2) ? t2 : [t2];
      }
      function ul(t2, e2) {
        return t2 && t2[e2] ? { ...t2, ...t2[e2] } : { ...t2 };
      }
      const cl = (t2) => "number" == typeof t2, hl = (t2) => t2.every(cl);
      class dl extends Vo {
        constructor() {
          super(...arguments), this.type = "object";
        }
        readValueFromInstance(t2, e2) {
          if (function(t3, e3) {
            return t3 in e3;
          }(e2, t2)) {
            const n2 = t2[e2];
            if ("string" == typeof n2 || "number" == typeof n2) return n2;
          }
        }
        getBaseTargetFromProps() {
        }
        removeValueFromRenderState(t2, e2) {
          delete e2.output[t2];
        }
        measureInstanceViewportBox() {
          return { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
        }
        build(t2, e2) {
          Object.assign(t2.output, e2);
        }
        renderInstance(t2, { output: e2 }) {
          Object.assign(t2, e2);
        }
        sortInstanceNodePosition() {
          return 0;
        }
      }
      function pl(t2) {
        const e2 = { presenceContext: null, props: {}, visualState: { renderState: { transform: {}, transformOrigin: {}, style: {}, vars: {}, attrs: {} }, latestValues: {} } }, n2 = ji(t2) ? new Fa(e2) : new Uo(e2);
        n2.mount(t2), xo.set(t2, n2);
      }
      function ml(t2) {
        const e2 = new dl({ presenceContext: null, props: {}, visualState: { renderState: { output: {} }, latestValues: {} } });
        e2.mount(t2), xo.set(t2, e2);
      }
      function fl(t2, e2, n2, i2) {
        const s2 = [];
        if (function(t3, e3) {
          return Ut(t3) || "number" == typeof t3 || "string" == typeof t3 && !Qa(e3);
        }(t2, e2)) s2.push(Li(t2, Qa(e2) && e2.default || e2, n2 && n2.default || n2));
        else {
          const o2 = tl(t2, e2, i2), r2 = o2.length;
          for (let t3 = 0; t3 < r2; t3++) {
            const i3 = o2[t3], a2 = i3 instanceof Element ? pl : ml;
            xo.has(i3) || a2(i3);
            const l2 = xo.get(i3), u2 = { ...n2 };
            "delay" in u2 && "function" == typeof u2.delay && (u2.delay = u2.delay(t3, r2)), s2.push(...sr(l2, { ...e2, transition: u2 }, {}));
          }
        }
        return s2;
      }
      function gl(t2, e2, n2) {
        const i2 = [];
        return function(t3, { defaultTransition: e3 = {}, ...n3 } = {}, i3, s2) {
          const o2 = e3.duration || 0.3, r2 = /* @__PURE__ */ new Map(), a2 = /* @__PURE__ */ new Map(), l2 = {}, u2 = /* @__PURE__ */ new Map();
          let c2 = 0, h2 = 0, d2 = 0;
          for (let n4 = 0; n4 < t3.length; n4++) {
            const r3 = t3[n4];
            if ("string" == typeof r3) {
              u2.set(r3, h2);
              continue;
            }
            if (!Array.isArray(r3)) {
              u2.set(r3.name, nl(h2, r3.at, c2, u2));
              continue;
            }
            let [p2, m2, f2 = {}] = r3;
            void 0 !== f2.at && (h2 = nl(h2, f2.at, c2, u2));
            let g2 = 0;
            const y2 = (t4, n5, i4, r4 = 0, a3 = 0) => {
              const l3 = ll(t4), { delay: u3 = 0, times: c3 = gi(l3), type: p3 = "keyframes", repeat: m3, repeatType: f3, repeatDelay: y3 = 0, ...v2 } = n5;
              let { ease: x2 = e3.ease || "easeOut", duration: w2 } = n5;
              const P2 = "function" == typeof u3 ? u3(r4, a3) : u3, S2 = l3.length, T2 = X(p3) ? p3 : null == s2 ? void 0 : s2[p3];
              if (S2 <= 2 && T2) {
                let t5 = 100;
                if (2 === S2 && hl(l3)) {
                  const e5 = l3[1] - l3[0];
                  t5 = Math.abs(e5);
                }
                const e4 = { ...v2 };
                void 0 !== w2 && (e4.duration = j(w2));
                const n6 = H(e4, t5, T2);
                x2 = n6.ease, w2 = n6.duration;
              }
              null != w2 || (w2 = o2);
              const b2 = h2 + P2;
              1 === c3.length && 0 === c3[0] && (c3[1] = 1);
              const A2 = c3.length - l3.length;
              if (A2 > 0 && fi(c3, A2), 1 === l3.length && l3.unshift(null), m3) {
                w2 = el(w2, m3);
                const t5 = [...l3], e4 = [...c3];
                x2 = Array.isArray(x2) ? [...x2] : [x2];
                const n6 = [...x2];
                for (let i5 = 0; i5 < m3; i5++) {
                  l3.push(...t5);
                  for (let s3 = 0; s3 < t5.length; s3++) c3.push(e4[s3] + (i5 + 1)), x2.push(0 === s3 ? "linear" : Ja(n6, s3 - 1));
                }
                sl(c3, m3);
              }
              const E2 = b2 + w2;
              il(i4, l3, x2, c3, b2, E2), g2 = Math.max(P2 + w2, g2), d2 = Math.max(E2, d2);
            };
            if (Ut(p2)) {
              y2(m2, f2, al("default", rl(p2, a2)));
            } else {
              const t4 = tl(p2, m2, i3, l2), e4 = t4.length;
              for (let n5 = 0; n5 < e4; n5++) {
                m2 = m2, f2 = f2;
                const i4 = rl(t4[n5], a2);
                for (const t5 in m2) y2(m2[t5], ul(f2, t5), al(t5, i4), n5, e4);
              }
            }
            c2 = h2, h2 += g2;
          }
          return a2.forEach((t4, i4) => {
            for (const s3 in t4) {
              const o3 = t4[s3];
              o3.sort(ol);
              const a3 = [], l3 = [], u3 = [];
              for (let t5 = 0; t5 < o3.length; t5++) {
                const { at: e4, value: n4, easing: i5 } = o3[t5];
                a3.push(n4), l3.push(F(0, d2, e4)), u3.push(i5 || "easeOut");
              }
              0 !== l3[0] && (l3.unshift(0), a3.unshift(a3[0]), u3.unshift("easeInOut")), 1 !== l3[l3.length - 1] && (l3.push(1), a3.push(null)), r2.has(i4) || r2.set(i4, { keyframes: {}, transition: {} });
              const c3 = r2.get(i4);
              c3.keyframes[s3] = a3, c3.transition[s3] = { ...e3, duration: d2, ease: u3, times: l3, ...n3 };
            }
          }), r2;
        }(t2, e2, n2, { spring: ri }).forEach(({ keyframes: t3, transition: e3 }, n3) => {
          i2.push(...fl(n3, t3, e3));
        }), i2;
      }
      function yl(t2) {
        return function(e2, n2, i2) {
          let s2 = [];
          var o2;
          o2 = e2, s2 = Array.isArray(o2) && o2.some(Array.isArray) ? gl(e2, n2, t2) : fl(e2, n2, i2, t2);
          const r2 = new N(s2);
          return t2 && t2.animations.push(r2), r2;
        };
      }
      const vl = yl();
      function xl(t2, e2, n2) {
        t2.style.setProperty(e2, n2);
      }
      function wl(t2, e2, n2) {
        t2.style[e2] = n2;
      }
      const Pl = B(() => {
        try {
          document.createElement("div").animate({ opacity: [1] });
        } catch (t2) {
          return false;
        }
        return true;
      }), Sl = /* @__PURE__ */ new WeakMap();
      function Tl(t2) {
        const e2 = Sl.get(t2) || /* @__PURE__ */ new Map();
        return Sl.set(t2, e2), Sl.get(t2);
      }
      class bl extends class {
        constructor(t2) {
          this.animation = t2;
        }
        get duration() {
          var t2, e2, n2;
          const i2 = (null === (e2 = null === (t2 = this.animation) || void 0 === t2 ? void 0 : t2.effect) || void 0 === e2 ? void 0 : e2.getComputedTiming().duration) || (null === (n2 = this.options) || void 0 === n2 ? void 0 : n2.duration) || 300;
          return I(Number(i2));
        }
        get time() {
          var t2;
          return this.animation ? I((null === (t2 = this.animation) || void 0 === t2 ? void 0 : t2.currentTime) || 0) : 0;
        }
        set time(t2) {
          this.animation && (this.animation.currentTime = j(t2));
        }
        get speed() {
          return this.animation ? this.animation.playbackRate : 1;
        }
        set speed(t2) {
          this.animation && (this.animation.playbackRate = t2);
        }
        get state() {
          return this.animation ? this.animation.playState : "finished";
        }
        get startTime() {
          return this.animation ? this.animation.startTime : null;
        }
        get finished() {
          return this.animation ? this.animation.finished : Promise.resolve();
        }
        play() {
          this.animation && this.animation.play();
        }
        pause() {
          this.animation && this.animation.pause();
        }
        stop() {
          this.animation && "idle" !== this.state && "finished" !== this.state && (this.animation.commitStyles && this.animation.commitStyles(), this.cancel());
        }
        flatten() {
          var t2, e2;
          this.animation && (null === (t2 = this.options) || void 0 === t2 ? void 0 : t2.allowFlatten) && (null === (e2 = this.animation.effect) || void 0 === e2 || e2.updateTiming({ easing: "linear" }));
        }
        attachTimeline(t2) {
          return this.animation && Y(this.animation, t2), R;
        }
        complete() {
          this.animation && this.animation.finish();
        }
        cancel() {
          try {
            this.animation && this.animation.cancel();
          } catch (t2) {
          }
        }
      } {
        constructor(t2, e2, n2, i2) {
          const s2 = e2.startsWith("--");
          k("string" != typeof i2.type);
          const o2 = Tl(t2).get(e2);
          o2 && o2.stop();
          if (Array.isArray(n2) || (n2 = [n2]), function(t3, e3, n3) {
            for (let i3 = 0; i3 < e3.length; i3++) null === e3[i3] && (e3[i3] = 0 === i3 ? n3() : e3[i3 - 1]), "number" == typeof e3[i3] && Be[t3] && (e3[i3] = Be[t3].transform(e3[i3]));
            !Pl() && e3.length < 2 && e3.unshift(n3());
          }(e2, n2, () => e2.startsWith("--") ? t2.style.getPropertyValue(e2) : window.getComputedStyle(t2)[e2]), X(i2.type)) {
            const t3 = H(i2, 100, i2.type);
            i2.ease = q() ? t3.ease : "easeOut", i2.duration = j(t3.duration), i2.type = "keyframes";
          } else i2.ease = i2.ease || "easeOut";
          const r2 = () => {
            this.setValue(t2, e2, bn(n2, i2)), this.cancel(), this.resolveFinishedPromise();
          }, a2 = () => {
            this.setValue = s2 ? xl : wl, this.options = i2, this.updateFinishedPromise(), this.removeAnimation = () => {
              const n3 = Sl.get(t2);
              n3 && n3.delete(e2);
            };
          };
          Ai() ? (super(bi(t2, e2, n2, i2)), a2(), false === i2.autoplay && this.animation.pause(), this.animation.onfinish = r2, Tl(t2).set(e2, this)) : (super(), a2(), r2());
        }
        then(t2, e2) {
          return this.currentFinishedPromise.then(t2, e2);
        }
        updateFinishedPromise() {
          this.currentFinishedPromise = new Promise((t2) => {
            this.resolveFinishedPromise = t2;
          });
        }
        play() {
          "finished" === this.state && this.updateFinishedPromise(), super.play();
        }
        cancel() {
          this.removeAnimation(), super.cancel();
        }
      }
      const Al = (t2) => function(e2, n2, i2) {
        return new N(function(t3, e3, n3, i3) {
          const s2 = ft(t3, i3), o2 = s2.length, r2 = [];
          for (let t4 = 0; t4 < o2; t4++) {
            const i4 = s2[t4], a2 = { ...n3 };
            "function" == typeof a2.delay && (a2.delay = a2.delay(t4, o2));
            for (const t5 in e3) {
              const n4 = e3[t5], s3 = { ...z(a2, t5) };
              s3.duration = s3.duration ? j(s3.duration) : s3.duration, s3.delay = j(s3.delay || 0), s3.allowFlatten = !a2.type && !a2.ease, r2.push(new bl(i4, t5, n4, s3));
            }
          }
          return r2;
        }(e2, n2, i2, t2));
      }, El = Al();
      function Ml(t2, e2) {
        let n2;
        const i2 = () => {
          const { currentTime: i3 } = e2, s2 = (null === i3 ? 0 : i3.value) / 100;
          n2 !== s2 && t2(s2), n2 = s2;
        };
        return st.update(i2, true), () => ot(i2);
      }
      const Cl = /* @__PURE__ */ new WeakMap();
      let Vl;
      function Rl({ target: t2, contentRect: e2, borderBoxSize: n2 }) {
        var i2;
        null === (i2 = Cl.get(t2)) || void 0 === i2 || i2.forEach((i3) => {
          i3({ target: t2, contentSize: e2, get size() {
            return function(t3, e3) {
              if (e3) {
                const { inlineSize: t4, blockSize: n3 } = e3[0];
                return { width: t4, height: n3 };
              }
              return t3 instanceof SVGElement && "getBBox" in t3 ? t3.getBBox() : { width: t3.offsetWidth, height: t3.offsetHeight };
            }(t2, n2);
          } });
        });
      }
      function Dl(t2) {
        t2.forEach(Rl);
      }
      function kl(t2, e2) {
        Vl || "undefined" != typeof ResizeObserver && (Vl = new ResizeObserver(Dl));
        const n2 = ft(t2);
        return n2.forEach((t3) => {
          let n3 = Cl.get(t3);
          n3 || (n3 = /* @__PURE__ */ new Set(), Cl.set(t3, n3)), n3.add(e2), null == Vl || Vl.observe(t3);
        }), () => {
          n2.forEach((t3) => {
            const n3 = Cl.get(t3);
            null == n3 || n3.delete(e2), (null == n3 ? void 0 : n3.size) || null == Vl || Vl.unobserve(t3);
          });
        };
      }
      const Ll = /* @__PURE__ */ new Set();
      let Bl;
      function Fl(t2) {
        return Ll.add(t2), Bl || (Bl = () => {
          const t3 = { width: window.innerWidth, height: window.innerHeight }, e2 = { target: window, size: t3, contentSize: t3 };
          Ll.forEach((t4) => t4(e2));
        }, window.addEventListener("resize", Bl)), () => {
          Ll.delete(t2), !Ll.size && Bl && (Bl = void 0);
        };
      }
      const Ol = { x: { length: "Width", position: "Left" }, y: { length: "Height", position: "Top" } };
      function jl(t2, e2, n2, i2) {
        const s2 = n2[e2], { length: o2, position: r2 } = Ol[e2], a2 = s2.current, l2 = n2.time;
        s2.current = t2["scroll" + r2], s2.scrollLength = t2["scroll" + o2] - t2["client" + o2], s2.offset.length = 0, s2.offset[0] = 0, s2.offset[1] = s2.scrollLength, s2.progress = F(0, s2.scrollLength, s2.current);
        const u2 = i2 - l2;
        s2.velocity = u2 > 50 ? 0 : U(s2.current - a2, u2);
      }
      const Il = { start: 0, center: 0.5, end: 1 };
      function Ul(t2, e2, n2 = 0) {
        let i2 = 0;
        if (t2 in Il && (t2 = Il[t2]), "string" == typeof t2) {
          const e3 = parseFloat(t2);
          t2.endsWith("px") ? i2 = e3 : t2.endsWith("%") ? t2 = e3 / 100 : t2.endsWith("vw") ? i2 = e3 / 100 * document.documentElement.clientWidth : t2.endsWith("vh") ? i2 = e3 / 100 * document.documentElement.clientHeight : t2 = e3;
        }
        return "number" == typeof t2 && (i2 = e2 * t2), n2 + i2;
      }
      const Wl = [0, 0];
      function Nl(t2, e2, n2, i2) {
        let s2 = Array.isArray(t2) ? t2 : Wl, o2 = 0, r2 = 0;
        return "number" == typeof t2 ? s2 = [t2, t2] : "string" == typeof t2 && (s2 = (t2 = t2.trim()).includes(" ") ? t2.split(" ") : [t2, Il[t2] ? t2 : "0"]), o2 = Ul(s2[0], n2, i2), r2 = Ul(s2[1], e2), o2 - r2;
      }
      const zl = { Enter: [[0, 1], [1, 1]], Exit: [[0, 0], [1, 0]], Any: [[1, 0], [0, 1]], All: [[0, 0], [1, 1]] }, $l = { x: 0, y: 0 };
      function Hl(t2, e2, n2) {
        const { offset: i2 = zl.All } = n2, { target: s2 = t2, axis: o2 = "y" } = n2, r2 = "y" === o2 ? "height" : "width", a2 = s2 !== t2 ? function(t3, e3) {
          const n3 = { x: 0, y: 0 };
          let i3 = t3;
          for (; i3 && i3 !== e3; ) if (i3 instanceof HTMLElement) n3.x += i3.offsetLeft, n3.y += i3.offsetTop, i3 = i3.offsetParent;
          else if ("svg" === i3.tagName) {
            const t4 = i3.getBoundingClientRect();
            i3 = i3.parentElement;
            const e4 = i3.getBoundingClientRect();
            n3.x += t4.left - e4.left, n3.y += t4.top - e4.top;
          } else {
            if (!(i3 instanceof SVGGraphicsElement)) break;
            {
              const { x: t4, y: e4 } = i3.getBBox();
              n3.x += t4, n3.y += e4;
              let s3 = null, o3 = i3.parentNode;
              for (; !s3; ) "svg" === o3.tagName && (s3 = o3), o3 = i3.parentNode;
              i3 = s3;
            }
          }
          return n3;
        }(s2, t2) : $l, l2 = s2 === t2 ? { width: t2.scrollWidth, height: t2.scrollHeight } : function(t3) {
          return "getBBox" in t3 && "svg" !== t3.tagName ? t3.getBBox() : { width: t3.clientWidth, height: t3.clientHeight };
        }(s2), u2 = { width: t2.clientWidth, height: t2.clientHeight };
        e2[o2].offset.length = 0;
        let c2 = !e2[o2].interpolate;
        const h2 = i2.length;
        for (let t3 = 0; t3 < h2; t3++) {
          const n3 = Nl(i2[t3], u2[r2], l2[r2], a2[o2]);
          c2 || n3 === e2[o2].interpolatorOffsets[t3] || (c2 = true), e2[o2].offset[t3] = n3;
        }
        c2 && (e2[o2].interpolate = mi(e2[o2].offset, gi(i2), { clamp: false }), e2[o2].interpolatorOffsets = [...e2[o2].offset]), e2[o2].progress = ne(0, 1, e2[o2].interpolate(e2[o2].current));
      }
      function Xl(t2, e2, n2, i2 = {}) {
        return { measure: () => function(t3, e3 = t3, n3) {
          if (n3.x.targetOffset = 0, n3.y.targetOffset = 0, e3 !== t3) {
            let i3 = e3;
            for (; i3 && i3 !== t3; ) n3.x.targetOffset += i3.offsetLeft, n3.y.targetOffset += i3.offsetTop, i3 = i3.offsetParent;
          }
          n3.x.targetLength = e3 === t3 ? e3.scrollWidth : e3.clientWidth, n3.y.targetLength = e3 === t3 ? e3.scrollHeight : e3.clientHeight, n3.x.containerLength = t3.clientWidth, n3.y.containerLength = t3.clientHeight;
        }(t2, i2.target, n2), update: (e3) => {
          !function(t3, e4, n3) {
            jl(t3, "x", e4, n3), jl(t3, "y", e4, n3), e4.time = n3;
          }(t2, n2, e3), (i2.offset || i2.target) && Hl(t2, n2, i2);
        }, notify: () => e2(n2) };
      }
      const Yl = /* @__PURE__ */ new WeakMap(), Kl = /* @__PURE__ */ new WeakMap(), Gl = /* @__PURE__ */ new WeakMap(), _l = (t2) => t2 === document.documentElement ? window : t2;
      function ql(t2, { container: e2 = document.documentElement, ...n2 } = {}) {
        let i2 = Gl.get(e2);
        i2 || (i2 = /* @__PURE__ */ new Set(), Gl.set(e2, i2));
        const s2 = Xl(e2, t2, { time: 0, x: { current: 0, offset: [], progress: 0, scrollLength: 0, targetOffset: 0, targetLength: 0, containerLength: 0, velocity: 0 }, y: { current: 0, offset: [], progress: 0, scrollLength: 0, targetOffset: 0, targetLength: 0, containerLength: 0, velocity: 0 } }, n2);
        if (i2.add(s2), !Yl.has(e2)) {
          const t3 = () => {
            for (const t4 of i2) t4.measure();
          }, n3 = () => {
            for (const t4 of i2) t4.update(rt.timestamp);
          }, s3 = () => {
            for (const t4 of i2) t4.notify();
          }, a3 = () => {
            st.read(t3, false, true), st.read(n3, false, true), st.update(s3, false, true);
          };
          Yl.set(e2, a3);
          const l2 = _l(e2);
          window.addEventListener("resize", a3, { passive: true }), e2 !== document.documentElement && Kl.set(e2, (r2 = a3, "function" == typeof (o2 = e2) ? Fl(o2) : kl(o2, r2))), l2.addEventListener("scroll", a3, { passive: true });
        }
        var o2, r2;
        const a2 = Yl.get(e2);
        return st.read(a2, false, true), () => {
          var t3;
          ot(a2);
          const n3 = Gl.get(e2);
          if (!n3) return;
          if (n3.delete(s2), n3.size) return;
          const i3 = Yl.get(e2);
          Yl.delete(e2), i3 && (_l(e2).removeEventListener("scroll", i3), null === (t3 = Kl.get(e2)) || void 0 === t3 || t3(), window.removeEventListener("resize", i3));
        };
      }
      const Zl = /* @__PURE__ */ new Map();
      function Jl({ source: t2, container: e2 = document.documentElement, axis: n2 = "y" } = {}) {
        t2 && (e2 = t2), Zl.has(e2) || Zl.set(e2, {});
        const i2 = Zl.get(e2);
        return i2[n2] || (i2[n2] = W() ? new ScrollTimeline({ source: e2, axis: n2 }) : function({ source: t3, container: e3, axis: n3 = "y" }) {
          t3 && (e3 = t3);
          const i3 = { value: 0 }, s2 = ql((t4) => {
            i3.value = 100 * t4[n3].progress;
          }, { container: e3, axis: n3 });
          return { currentTime: i3, cancel: s2 };
        }({ source: e2, axis: n2 })), i2[n2];
      }
      function Ql(t2) {
        return t2 && (t2.target || t2.offset);
      }
      function tu(t2, { axis: e2 = "y", ...n2 } = {}) {
        const i2 = { axis: e2, ...n2 };
        return "function" == typeof t2 ? function(t3, e3) {
          return function(t4) {
            return 2 === t4.length;
          }(t3) || Ql(e3) ? ql((n3) => {
            t3(n3[e3.axis].progress, n3);
          }, e3) : Ml(t3, Jl(e3));
        }(t2, i2) : function(t3, e3) {
          if (t3.flatten(), Ql(e3)) return t3.pause(), ql((n3) => {
            t3.time = t3.duration * n3[e3.axis].progress;
          }, e3);
          {
            const n3 = Jl(e3);
            return t3.attachTimeline ? t3.attachTimeline(n3, (t4) => (t4.pause(), Ml((e4) => {
              t4.time = t4.duration * e4;
            }, n3))) : R;
          }
        }(t2, i2);
      }
      const eu = { some: 0, all: 1 };
      function nu(t2, e2, { root: n2, margin: i2, amount: s2 = "some" } = {}) {
        const o2 = ft(t2), r2 = /* @__PURE__ */ new WeakMap(), a2 = new IntersectionObserver((t3) => {
          t3.forEach((t4) => {
            const n3 = r2.get(t4.target);
            if (t4.isIntersecting !== Boolean(n3)) if (t4.isIntersecting) {
              const n4 = e2(t4.target, t4);
              "function" == typeof n4 ? r2.set(t4.target, n4) : a2.unobserve(t4.target);
            } else "function" == typeof n3 && (n3(t4), r2.delete(t4.target));
          });
        }, { root: n2, rootMargin: i2, threshold: "number" == typeof s2 ? s2 : eu[s2] });
        return o2.forEach((t3) => a2.observe(t3)), () => a2.disconnect();
      }
      const iu = Jo(Ba());
      function su(t2) {
        return e.useEffect(() => () => t2(), []);
      }
      const ou = { renderer: Oa, ...vr, ...ea }, ru = { ...ou, ...Yr, ...na }, au = { renderer: Oa, ...vr };
      function lu(t2, n2, i2) {
        e.useInsertionEffect(() => t2.on(n2, i2), [t2, n2, i2]);
      }
      function uu(t2, e2) {
        D(Boolean(!e2 || e2.current));
      }
      const cu = () => ({ scrollX: Vt(0), scrollY: Vt(0), scrollXProgress: Vt(0), scrollYProgress: Vt(0) });
      function hu({ container: t2, target: n2, layoutEffect: i2 = true, ...s2 } = {}) {
        const o2 = f(cu);
        return (i2 ? y : e.useEffect)(() => (uu(0, n2), uu(0, t2), tu((t3, { x: e2, y: n3 }) => {
          o2.scrollX.set(e2.current), o2.scrollXProgress.set(e2.progress), o2.scrollY.set(n3.current), o2.scrollYProgress.set(n3.progress);
        }, { ...s2, container: (null == t2 ? void 0 : t2.current) || void 0, target: (null == n2 ? void 0 : n2.current) || void 0 })), [t2, n2, JSON.stringify(s2.offset)]), o2;
      }
      function du(t2, e2) {
        return e2 ? t2 + e2 : t2;
      }
      function pu(t2) {
        return "number" == typeof t2 ? t2 : parseFloat(t2);
      }
      function mu(t2) {
        const n2 = e.useRef(0), { isStatic: i2 } = e.useContext(x);
        e.useEffect(() => {
          if (i2) return;
          const e2 = ({ timestamp: e3, delta: i3 }) => {
            n2.current || (n2.current = e3), t2(e3 - n2.current, i3);
          };
          return st.update(e2, true), () => ot(e2);
        }, [t2]);
      }
      class fu extends Ct {
        constructor() {
          super(...arguments), this.values = [];
        }
        add(t2) {
          const e2 = function(t3) {
            return te.has(t3) ? "transform" : Ti.has(t3) ? Bi(t3) : void 0;
          }(t2);
          e2 && (C(this.values, e2), this.update());
        }
        update() {
          this.set(this.values.length ? this.values.join(", ") : "auto");
        }
      }
      function gu() {
        !go.current && yo();
        const [t2] = e.useState(fo.current);
        return t2;
      }
      function yu(t2, e2) {
        [...e2].reverse().forEach((n2) => {
          const i2 = t2.getVariant(n2);
          i2 && er(t2, i2), t2.variantChildren && t2.variantChildren.forEach((t3) => {
            yu(t3, e2);
          });
        });
      }
      function vu() {
        const t2 = /* @__PURE__ */ new Set(), e2 = { subscribe: (e3) => (t2.add(e3), () => {
          t2.delete(e3);
        }), start(e3, n2) {
          const i2 = [];
          return t2.forEach((t3) => {
            i2.push(ar(t3, e3, { transitionOverride: n2 }));
          }), Promise.all(i2);
        }, set: (e3) => t2.forEach((t3) => {
          !function(t4, e4) {
            Array.isArray(e4) ? yu(t4, e4) : "string" == typeof e4 ? yu(t4, [e4]) : er(t4, e4);
          }(t3, e3);
        }), stop() {
          t2.forEach((t3) => {
            !function(t4) {
              t4.values.forEach((t5) => t5.stop());
            }(t3);
          });
        }, mount: () => () => {
          e2.stop();
        } };
        return e2;
      }
      function xu() {
        const t2 = f(vu);
        return y(t2.mount, []), t2;
      }
      const wu = xu;
      class Pu {
        constructor() {
          this.componentControls = /* @__PURE__ */ new Set();
        }
        subscribe(t2) {
          return this.componentControls.add(t2), () => this.componentControls.delete(t2);
        }
        start(t2, e2) {
          this.componentControls.forEach((n2) => {
            n2.start(t2.nativeEvent || t2, e2);
          });
        }
      }
      const Su = () => new Pu();
      function Tu(t2) {
        return null !== t2 && "object" == typeof t2 && ra in t2;
      }
      function bu() {
        return Au;
      }
      function Au(t2) {
        oo.current && (oo.current.isUpdating = false, oo.current.blockUpdate(), t2 && t2());
      }
      const Eu = /* @__PURE__ */ new Map(), Mu = /* @__PURE__ */ new Map(), Cu = (t2, e2) => `${t2}: ${te.has(e2) ? "transform" : e2}`;
      function Vu(t2, e2, n2) {
        var i2;
        const s2 = Cu(t2, e2), o2 = Eu.get(s2);
        if (!o2) return null;
        const { animation: r2, startTime: a2 } = o2;
        function l2() {
          var i3;
          null === (i3 = window.MotionCancelOptimisedAnimation) || void 0 === i3 || i3.call(window, t2, e2, n2);
        }
        return r2.onfinish = l2, null === a2 || (null === (i2 = window.MotionHandoffIsComplete) || void 0 === i2 ? void 0 : i2.call(window, t2)) ? (l2(), null) : a2;
      }
      let Ru, Du;
      const ku = /* @__PURE__ */ new Set();
      function Lu() {
        ku.forEach((t2) => {
          t2.animation.play(), t2.animation.startTime = t2.startTime;
        }), ku.clear();
      }
      const Bu = () => ({});
      class Fu extends Vo {
        constructor() {
          super(...arguments), this.measureInstanceViewportBox = ys;
        }
        build() {
        }
        resetTransform() {
        }
        restoreTransform() {
        }
        removeValueFromRenderState() {
        }
        renderInstance() {
        }
        scrapeMotionValuesFromProps() {
          return {};
        }
        getBaseTargetFromProps() {
        }
        readValueFromInstance(t2, e2, n2) {
          return n2.initialState[e2] || 0;
        }
        sortInstanceNodePosition() {
          return 0;
        }
      }
      const Ou = Aa({ scrapeMotionValuesFromProps: Bu, createRenderState: Bu });
      let ju = 0;
      const Iu = (t2) => t2 > 1e-3 ? 1 / t2 : 1e5;
      t.AcceleratedAnimation = Mi, t.AnimatePresence = ({ children: t2, custom: n2, initial: i2 = true, onExitComplete: s2, presenceAffectsLayout: o2 = true, mode: r2 = "sync", propagate: a2 = false, anchorX: l2 = "left" }) => {
        const [u2, c2] = b(a2), p2 = e.useMemo(() => E(t2), [t2]), g2 = a2 && !u2 ? [] : p2.map(A), v2 = e.useRef(true), x2 = e.useRef(p2), w2 = f(() => /* @__PURE__ */ new Map()), [P2, T2] = e.useState(p2), [M2, C2] = e.useState(p2);
        y(() => {
          v2.current = false, x2.current = p2;
          for (let t3 = 0; t3 < M2.length; t3++) {
            const e2 = A(M2[t3]);
            g2.includes(e2) ? w2.delete(e2) : true !== w2.get(e2) && w2.set(e2, false);
          }
        }, [M2, g2.length, g2.join("-")]);
        const V2 = [];
        if (p2 !== P2) {
          let t3 = [...p2];
          for (let e2 = 0; e2 < M2.length; e2++) {
            const n3 = M2[e2], i3 = A(n3);
            g2.includes(i3) || (t3.splice(e2, 0, n3), V2.push(n3));
          }
          return "wait" === r2 && V2.length && (t3 = V2), C2(E(t3)), T2(p2), null;
        }
        const { forceRender: R2 } = e.useContext(m);
        return d(h, { children: M2.map((t3) => {
          const e2 = A(t3), h2 = !(a2 && !u2) && (p2 === M2 || g2.includes(e2));
          return d(S, { isPresent: h2, initial: !(v2.current && !i2) && void 0, custom: n2, presenceAffectsLayout: o2, mode: r2, onExitComplete: h2 ? void 0 : () => {
            if (!w2.has(e2)) return;
            w2.set(e2, true);
            let t4 = true;
            w2.forEach((e3) => {
              e3 || (t4 = false);
            }), t4 && (null == R2 || R2(), C2(x2.current), a2 && (null == c2 || c2()), s2 && s2());
          }, anchorX: l2, children: t3 }, e2);
        }) });
      }, t.AnimateSharedLayout = ({ children: t2 }) => (i.useEffect(() => {
      }, []), d(zo, { id: f(() => "asl-" + ju++), children: t2 })), t.DeprecatedLayoutGroupContext = M, t.DragControls = Pu, t.FlatTree = Ui, t.LayoutGroup = zo, t.LayoutGroupContext = m, t.LazyMotion = function({ children: t2, features: n2, strict: i2 = false }) {
        const [, s2] = e.useState(!Xo(n2)), o2 = e.useRef(void 0);
        if (!Xo(n2)) {
          const { renderer: t3, ...e2 } = n2;
          o2.current = t3, Ho(e2);
        }
        return e.useEffect(() => {
          Xo(n2) && n2().then(({ renderer: t3, ...e2 }) => {
            Ho(e2), o2.current = t3, s2(true);
          });
        }, []), d($o.Provider, { value: { renderer: o2.current, strict: i2 }, children: t2 });
      }, t.MotionConfig = function({ children: t2, isValidProp: n2, ...i2 }) {
        n2 && _o(n2), (i2 = { ...e.useContext(x), ...i2 }).isStatic = f(() => i2.isStatic);
        const s2 = e.useMemo(() => i2, [JSON.stringify(i2.transition), i2.transformPagePoint, i2.reducedMotion]);
        return d(x.Provider, { value: s2, children: t2 });
      }, t.MotionConfigContext = x, t.MotionContext = ia, t.MotionGlobalConfig = L, t.MotionValue = Ct, t.PresenceContext = v, t.Reorder = qa, t.SwitchLayoutGroupContext = zr, t.VisualElement = Vo, t.addPointerEvent = Pr, t.addPointerInfo = wr, t.addScaleCorrector = Ms, t.animate = vl, t.animateMini = El, t.animateValue = Si, t.animateVisualElement = ar, t.animationControls = vu, t.animations = vr, t.anticipate = Gt, t.backIn = Yt, t.backInOut = Kt, t.backOut = Xt, t.buildTransform = Bo, t.calcLength = Dt, t.cancelFrame = ot, t.circIn = _t, t.circInOut = Zt, t.circOut = qt, t.clamp = ne, t.color = Se, t.complex = Ve, t.createBox = ys, t.createRendererMotionComponent = ua, t.createScopedAnimate = yl, t.cubicBezier = zt, t.delay = Wi, t.disableInstantTransitions = function() {
        Wt.current = false;
      }, t.distance = br, t.distance2D = Ar, t.domAnimation = ou, t.domMax = ru, t.domMin = au, t.easeIn = li, t.easeInOut = ci, t.easeOut = ui, t.filterProps = qo, t.findSpring = ei, t.frame = st, t.frameData = rt, t.hover = vt, t.inView = nu, t.inertia = ai, t.interpolate = mi, t.invariant = k, t.isBrowser = g, t.isDragActive = mt, t.isMotionComponent = Tu, t.isMotionValue = Ut, t.isValidMotionProp = Ko, t.keyframes = yi, t.m = iu, t.makeUseVisualState = Aa, t.mirrorEasing = $t, t.mix = Wn, t.motion = ja, t.motionValue = Vt, t.noop = R, t.optimizedAppearDataAttribute = Fi, t.pipe = Ln, t.press = Et, t.progress = F, t.px = ye, t.resolveMotionValue = zi, t.reverseEasing = Ht, t.scroll = tu, t.scrollInfo = ql, t.spring = ri, t.stagger = function(t2 = 0.1, { startDelay: e2 = 0, from: n2 = 0, ease: i2 } = {}) {
        return (s2, o2) => {
          const r2 = "number" == typeof n2 ? n2 : function(t3, e3) {
            if ("first" === t3) return 0;
            {
              const n3 = e3 - 1;
              return "last" === t3 ? n3 : n3 / 2;
            }
          }(n2, o2), a2 = Math.abs(r2 - s2);
          let l2 = t2 * a2;
          if (i2) {
            const e3 = o2 * t2;
            l2 = pi(i2)(l2 / e3) * e3;
          }
          return e2 + l2;
        };
      }, t.startOptimizedAppearAnimation = function(t2, e2, n2, i2, s2) {
        if (window.MotionIsMounted) return;
        const o2 = t2.dataset.framerAppearId;
        if (!o2) return;
        window.MotionHandoffAnimation = Vu;
        const r2 = Cu(o2, e2);
        Du || (Du = bi(t2, e2, [n2[0], n2[0]], { duration: 1e4, ease: "linear" }), Eu.set(r2, { animation: Du, startTime: null }), window.MotionHandoffAnimation = Vu, window.MotionHasOptimisedAnimation = (t3, e3) => {
          if (!t3) return false;
          if (!e3) return Mu.has(t3);
          const n3 = Cu(t3, e3);
          return Boolean(Eu.get(n3));
        }, window.MotionHandoffMarkAsComplete = (t3) => {
          Mu.has(t3) && Mu.set(t3, true);
        }, window.MotionHandoffIsComplete = (t3) => true === Mu.get(t3), window.MotionCancelOptimisedAnimation = (t3, e3, n3, i3) => {
          const s3 = Cu(t3, e3), o3 = Eu.get(s3);
          o3 && (n3 && void 0 === i3 ? n3.postRender(() => {
            n3.postRender(() => {
              o3.animation.cancel();
            });
          }) : o3.animation.cancel(), n3 && i3 ? (ku.add(o3), n3.render(Lu)) : (Eu.delete(s3), Eu.size || (window.MotionCancelOptimisedAnimation = void 0)));
        }, window.MotionCheckAppearSync = (t3, e3, n3) => {
          var i3, s3;
          const o3 = Oi(t3);
          if (!o3) return;
          const r3 = null === (i3 = window.MotionHasOptimisedAnimation) || void 0 === i3 ? void 0 : i3.call(window, o3, e3), a3 = null === (s3 = t3.props.values) || void 0 === s3 ? void 0 : s3[e3];
          if (!r3 || !a3) return;
          const l2 = n3.on("change", (t4) => {
            var n4;
            a3.get() !== t4 && (null === (n4 = window.MotionCancelOptimisedAnimation) || void 0 === n4 || n4.call(window, o3, e3), l2());
          });
          return l2;
        });
        const a2 = () => {
          Du.cancel();
          const o3 = bi(t2, e2, n2, i2);
          void 0 === Ru && (Ru = performance.now()), o3.startTime = Ru, Eu.set(r2, { animation: o3, startTime: Ru }), s2 && s2(o3);
        };
        Mu.set(o2, false), Du.ready ? Du.ready.then(a2).catch(R) : a2();
      }, t.steps = function(t2, e2 = "end") {
        return (n2) => {
          const i2 = (n2 = "end" === e2 ? Math.min(n2, 0.999) : Math.max(n2, 1e-3)) * t2, s2 = "end" === e2 ? Math.floor(i2) : Math.ceil(i2);
          return ne(0, 1, s2 / t2);
        };
      }, t.time = dt, t.transform = $a, t.unwrapMotionComponent = function(t2) {
        if (Tu(t2)) return t2[ra];
      }, t.useAnimate = function() {
        const t2 = f(() => ({ current: null, animations: [] })), e2 = f(() => yl(t2));
        return su(() => {
          t2.animations.forEach((t3) => t3.stop());
        }), [t2, e2];
      }, t.useAnimateMini = function() {
        const t2 = f(() => ({ current: null, animations: [] })), e2 = f(() => Al(t2));
        return su(() => {
          t2.animations.forEach((t3) => t3.stop());
        }), [t2, e2];
      }, t.useAnimation = wu, t.useAnimationControls = xu, t.useAnimationFrame = mu, t.useCycle = function(...t2) {
        const n2 = e.useRef(0), [i2, s2] = e.useState(t2[n2.current]);
        return [i2, e.useCallback((e2) => {
          n2.current = "number" != typeof e2 ? Za(0, t2.length, n2.current + 1) : e2, s2(t2[n2.current]);
        }, [t2.length, ...t2])];
      }, t.useDeprecatedAnimatedState = function(t2) {
        const [n2, i2] = e.useState(t2), s2 = Ou({}, false), o2 = f(() => new Fu({ props: { onUpdate: (t3) => {
          i2({ ...t3 });
        } }, visualState: s2, presenceContext: null }, { initialState: t2 }));
        return e.useLayoutEffect(() => (o2.mount({}), () => o2.unmount()), [o2]), [n2, f(() => (t3) => ar(o2, t3))];
      }, t.useDeprecatedInvertedScale = function(t2) {
        let n2 = za(1), i2 = za(1);
        const { visualElement: s2 } = e.useContext(ia);
        return t2 ? (n2 = t2.scaleX || n2, i2 = t2.scaleY || i2) : s2 && (n2 = s2.getValue("scaleX", 1), i2 = s2.getValue("scaleY", 1)), { scaleX: Xa(n2, Iu), scaleY: Xa(i2, Iu) };
      }, t.useDomEvent = function(t2, n2, i2, s2) {
        e.useEffect(() => {
          const e2 = t2.current;
          if (i2 && e2) return io(e2, n2, i2, s2);
        }, [t2, n2, i2, s2]);
      }, t.useDragControls = function() {
        return f(Su);
      }, t.useElementScroll = function(t2) {
        return hu({ container: t2 });
      }, t.useForceUpdate = Wo, t.useInView = function(t2, { root: n2, margin: i2, amount: s2, once: o2 = false, initial: r2 = false } = {}) {
        const [a2, l2] = e.useState(r2);
        return e.useEffect(() => {
          if (!t2.current || o2 && a2) return;
          const e2 = { root: n2 && n2.current || void 0, margin: i2, amount: s2 };
          return nu(t2.current, () => (l2(true), o2 ? void 0 : () => l2(false)), e2);
        }, [n2, t2, i2, o2, s2]), a2;
      }, t.useInstantLayoutTransition = bu, t.useInstantTransition = function() {
        const [t2, n2] = Wo(), i2 = bu(), s2 = e.useRef(-1);
        return e.useEffect(() => {
          st.postRender(() => st.postRender(() => {
            n2 === s2.current && (Wt.current = false);
          }));
        }, [n2]), (e2) => {
          i2(() => {
            Wt.current = true, t2(), e2(), s2.current = n2 + 1;
          });
        };
      }, t.useIsPresent = function() {
        return null === (t2 = e.useContext(v)) || t2.isPresent;
        var t2;
      }, t.useIsomorphicLayoutEffect = y, t.useMotionTemplate = function(t2, ...e2) {
        const n2 = t2.length;
        return Ha(e2.filter(Ut), function() {
          let i2 = "";
          for (let s2 = 0; s2 < n2; s2++) {
            i2 += t2[s2];
            const n3 = e2[s2];
            n3 && (i2 += Ut(n3) ? n3.get() : n3);
          }
          return i2;
        });
      }, t.useMotionValue = za, t.useMotionValueEvent = lu, t.usePresence = b, t.usePresenceData = function() {
        const t2 = e.useContext(v);
        return t2 ? t2.custom : void 0;
      }, t.useReducedMotion = gu, t.useReducedMotionConfig = function() {
        const t2 = gu(), { reducedMotion: n2 } = e.useContext(x);
        return "never" !== n2 && ("always" === n2 || t2);
      }, t.useResetProjection = function() {
        return e.useCallback(() => {
          const t2 = oo.current;
          t2 && t2.resetTree();
        }, []);
      }, t.useScroll = hu, t.useSpring = function(t2, n2 = {}) {
        const { isStatic: i2 } = e.useContext(x), s2 = e.useRef(null), o2 = f(() => Ut(t2) ? t2.get() : t2), r2 = f(() => "string" == typeof o2 ? o2.replace(/[\d.-]/g, "") : void 0), a2 = za(o2), l2 = e.useRef(o2), u2 = e.useRef(R), c2 = () => {
          h2(), s2.current = Si({ keyframes: [pu(a2.get()), pu(l2.current)], velocity: a2.getVelocity(), type: "spring", restDelta: 1e-3, restSpeed: 0.01, ...n2, onUpdate: u2.current });
        }, h2 = () => {
          s2.current && s2.current.stop();
        };
        return e.useInsertionEffect(() => a2.attach((t3, e2) => i2 ? e2(t3) : (l2.current = t3, u2.current = (t4) => e2(du(t4, r2)), st.postRender(c2), a2.get()), h2), [JSON.stringify(n2)]), y(() => {
          if (Ut(t2)) return t2.on("change", (t3) => a2.set(du(t3, r2)));
        }, [a2, r2]), a2;
      }, t.useTime = function() {
        const t2 = za(0);
        return mu((e2) => t2.set(e2)), t2;
      }, t.useTransform = Xa, t.useUnmountEffect = su, t.useVelocity = function(t2) {
        const e2 = za(t2.getVelocity()), n2 = () => {
          const i2 = t2.getVelocity();
          e2.set(i2), i2 && st.update(n2);
        };
        return lu(t2, "change", () => {
          st.update(n2, false, true);
        }), e2;
      }, t.useViewportScroll = function() {
        return hu();
      }, t.useWillChange = function() {
        return f(() => new fu("auto"));
      }, t.visualElementStore = xo, t.wrap = Za;
    });
  }
});
export default require_framer_motion();
//# sourceMappingURL=motion_react.js.map
