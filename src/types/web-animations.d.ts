/**
 * TypeScript declarations for Web Animation API
 * Provides type safety for animation-related functionality
 */

declare global {
	interface Keyframe {
		[property: string]: string | number | null;
		offset?: number | null;
		easing?: string;
		composite?: CompositeOperation;
	}

	interface KeyframeAnimationOptions {
		id?: string;
		delay?: number;
		direction?: PlaybackDirection;
		duration?: number | string;
		easing?: string;
		endDelay?: number;
		fill?: FillMode;
		iterationStart?: number;
		iterations?: number;
		composite?: CompositeOperation;
		iterationComposite?: IterationCompositeOperation;
	}

	type PlaybackDirection =
		| "normal"
		| "reverse"
		| "alternate"
		| "alternate-reverse";
	type FillMode = "none" | "forwards" | "backwards" | "both" | "auto";
	type CompositeOperation = "replace" | "add" | "accumulate";
	type IterationCompositeOperation = "replace" | "accumulate";
	type AnimationPlayState = "idle" | "running" | "paused" | "finished";

	interface Animation extends EventTarget {
		currentTime: number | null;
		effect: AnimationEffect | null;
		finished: Promise<Animation>;
		id: string;
		pending: boolean;
		playState: AnimationPlayState;
		playbackRate: number;
		ready: Promise<Animation>;
		replaceState: AnimationReplaceState;
		startTime: number | null;
		timeline: AnimationTimeline | null;

		cancel(): void;
		finish(): void;
		pause(): void;
		play(): void;
		reverse(): void;
		updatePlaybackRate(playbackRate: number): void;
		commitStyles(): void;
		persist(): void;

		oncancel: ((this: Animation, ev: AnimationPlaybackEvent) => any) | null;
		onfinish: ((this: Animation, ev: AnimationPlaybackEvent) => any) | null;
		onremove: ((this: Animation, ev: Event) => any) | null;
	}

	interface AnimationEffect {
		getComputedTiming(): ComputedEffectTiming;
		getTiming(): EffectTiming;
		updateTiming(timing?: OptionalEffectTiming): void;
	}

	interface KeyframeEffect extends AnimationEffect {
		target: Element | null;
		pseudoElement: string | null;
		composite: CompositeOperation;
		iterationComposite: IterationCompositeOperation;
		getKeyframes(): ComputedKeyframe[];
		setKeyframes(keyframes: Keyframe[] | PropertyIndexedKeyframes | null): void;
	}

	interface ComputedEffectTiming extends EffectTiming {
		endTime: number;
		activeDuration: number;
		localTime: number | null;
		progress: number | null;
		currentIteration: number | null;
	}

	interface EffectTiming {
		delay?: number;
		direction?: PlaybackDirection;
		duration?: number | string;
		easing?: string;
		endDelay?: number;
		fill?: FillMode;
		iterationStart?: number;
		iterations?: number;
	}

	interface OptionalEffectTiming {
		delay?: number;
		direction?: PlaybackDirection;
		duration?: number | string;
		easing?: string;
		endDelay?: number;
		fill?: FillMode;
		iterationStart?: number;
		iterations?: number;
	}

	interface ComputedKeyframe extends Keyframe {
		offset: number;
		computedOffset: number;
		easing: string;
	}

	interface PropertyIndexedKeyframes {
		[property: string]:
			| string
			| string[]
			| number
			| number[]
			| null
			| (string | number | null)[];
		offset?: number | (number | null)[];
		easing?: string | string[];
		composite?: CompositeOperation | CompositeOperation[];
	}

	type AnimationReplaceState = "active" | "removed" | "persisted";

	interface AnimationTimeline {
		currentTime: number | null;
	}

	interface AnimationPlaybackEvent extends Event {
		currentTime: number | null;
		timelineTime: number | null;
	}

	interface Element {
		animate(
			keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
			options?: number | KeyframeAnimationOptions,
		): Animation;
		getAnimations(options?: GetAnimationsOptions): Animation[];
	}

	interface GetAnimationsOptions {
		subtree?: boolean;
	}

	interface Document {
		getAnimations(): Animation[];
	}

	interface DocumentTimeline extends AnimationTimeline {
		readonly originTime: number;
	}

	interface Window {
		DocumentTimeline: {
			new (options?: DocumentTimelineOptions): DocumentTimeline;
		};
	}

	interface DocumentTimelineOptions {
		originTime?: number;
	}
}

export {};
