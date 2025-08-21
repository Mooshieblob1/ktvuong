// See https://kit.svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

interface IParticlesParams {
	[key: string]: unknown;
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface Window {
		particlesJS: (tagId: string, params: IParticlesParams) => void;
	}
}

export {};
