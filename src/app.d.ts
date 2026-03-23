// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	interface Window {
		__lenis?: {
			scrollTo: (target: string | number | HTMLElement, options?: { offset?: number }) => void;
			destroy: () => void;
		};
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				RESEND_API_KEY: string;
			};
		}
	}
}

export {};
