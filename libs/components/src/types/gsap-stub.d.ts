// GSAP stub types for TypeScript compilation
// This file provides minimal type definitions to prevent TypeScript errors
// when GSAP is not installed but referenced in code

declare global {
  namespace gsap {
    interface TweenVars {
      [key: string]: any;
      duration?: number;
      delay?: number;
      ease?: string;
      x?: number | string;
      y?: number | string;
      scale?: number;
      opacity?: number;
      rotation?: number;
      force3D?: boolean;
      stagger?: number;
      morphSVG?: string;
      onComplete?: () => void;
      onUpdate?: () => void;
    }

    namespace core {
      interface Timeline {
        to(
          target: any,
          variables: TweenVars,
          position?: string | number
        ): Timeline;
        from(
          target: any,
          variables: TweenVars,
          position?: string | number
        ): Timeline;
        fromTo(
          target: any,
          fromVariables: TweenVars,
          toVariables: TweenVars,
          position?: string | number
        ): Timeline;
        set(
          target: any,
          variables: TweenVars,
          position?: string | number
        ): Timeline;
        add(child: any, position?: string | number): Timeline;
        call(
          callback: () => void,
          params?: Array<any>,
          scope?: any,
          position?: string | number
        ): Timeline;
        eventCallback(
          type: string,
          callback?: (...arguments_: Array<any>) => void
        ): Timeline;
        play(): Timeline;
        pause(): Timeline;
        resume(): Timeline;
        kill(): Timeline;
        clear(): Timeline;
        progress(): number;
        delay(value: number): Timeline;
        repeat(value: number): Timeline;
        yoyo(value: boolean): Timeline;
      }

      interface Tween {
        kill(): void;
        play(): Tween;
        pause(): Tween;
        resume(): Tween;
        progress(): number;
      }
    }

    interface GSAPStatic {
      to(target: any, variables: TweenVars): core.Tween;
      from(target: any, variables: TweenVars): core.Tween;
      fromTo(
        target: any,
        fromVariables: TweenVars,
        toVariables: TweenVars
      ): core.Tween;
      set(target: any, variables: TweenVars): core.Tween;
      timeline(): core.Timeline;
      killTweensOf(target: any): void;
      registerPlugin(...plugins: Array<any>): void;
    }
  }

  const gsap: gsap.GSAPStatic;

  interface MorphSVGPluginStatic {
    [key: string]: any;
  }

  const MorphSVGPlugin: MorphSVGPluginStatic;
}

export {};
