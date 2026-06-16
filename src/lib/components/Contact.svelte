<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from './ui/Input.svelte';
	import Textarea from './ui/Textarea.svelte';
	import Button from './ui/Button.svelte';

	let sent = $state(false);
	let errMsg = $state('');
	let emailRevealed = $state(false);

	// Lightly obfuscated so scrapers don't lift it from source.
	const email = ['kent', '@', 'ktvuong', '.com'].join('');
</script>

<section id="contact" class="contact">
	<div class="grid">
		<div class="info">
			<div class="eyebrow"><span class="rule"></span><span>Say hello</span></div>
			<h2>Let's build something</h2>
			<p>
				Open to full-stack, DevOps and AI/ML roles. Have a project, a role, or just want to talk
				shop? My inbox is open.
			</p>
			<div class="rows">
				{#if emailRevealed}
					<a class="row" href="mailto:{email}">
						<span class="ico"
							><svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg
							></span
						>
						<span class="mono">{email}</span>
					</a>
				{:else}
					<button class="row" onclick={() => (emailRevealed = true)}>
						<span class="ico"
							><svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg
							></span
						>
						<span class="mono">Click to reveal email</span>
					</button>
				{/if}
				<a class="row" href="https://github.com/Mooshieblob1" target="_blank" rel="noopener">
					<span class="ico"
						><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
							><path
								d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.85 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
							/></svg
						></span
					>
					<span class="mono">@Mooshieblob1</span>
				</a>
				<a
					class="row"
					href="https://www.linkedin.com/in/kentvuong88/"
					target="_blank"
					rel="noopener"
				>
					<span class="ico"
						><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
							><path
								d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.2 8.3h4.56V24H.2V8.3Zm7.32 0h4.37v2.15h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v8.91h-4.56v-7.9c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.16V24H7.52V8.3Z"
							/></svg
						></span
					>
					<span class="mono">in/kentvuong88</span>
				</a>
			</div>
		</div>

		<form
			method="POST"
			action="?/contact"
			use:enhance={() => {
				sent = false;
				errMsg = '';
				return async ({ result, update }) => {
					if (result.type === 'success') sent = true;
					else if (result.type === 'failure')
						errMsg = (result.data?.error as string) || 'Something went wrong.';
					else errMsg = 'Something went wrong.';
					await update({ reset: true });
				};
			}}
		>
			{#if sent}
				<div class="flash ok">Message sent! I'll get back to you soon.</div>
			{/if}
			{#if errMsg}
				<div class="flash err">{errMsg}</div>
			{/if}
			<Input label="Name" name="name" placeholder="Your name" required />
			<Input label="Email" name="email" type="email" placeholder="you@example.com" required />
			<Textarea
				label="Message"
				name="message"
				rows={5}
				placeholder="What's on your mind?"
				required
			/>
			<Button type="submit" size="lg" fullWidth>Send message</Button>
		</form>
	</div>
</section>

<style>
	.contact {
		max-width: 1100px;
		margin: 0 auto;
		padding: clamp(40px, 7vh, 80px) clamp(20px, 5vw, 48px) clamp(48px, 8vh, 90px);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
		gap: clamp(28px, 5vw, 56px);
		align-items: start;
	}
	.info {
		display: flex;
		flex-direction: column;
		gap: 22px;
	}
	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--text-muted);
	}
	.rule {
		width: 22px;
		height: 2px;
		background: var(--accent-500);
		border-radius: 2px;
	}
	h2 {
		margin: 0;
		font-size: clamp(1.8rem, 3.6vw, 2.5rem);
		font-weight: 700;
		letter-spacing: -0.025em;
		color: var(--text-strong);
	}
	.info p {
		margin: 0;
		color: var(--text-muted);
		font-size: var(--text-base);
		line-height: 1.65;
		max-width: 42ch;
	}
	.rows {
		display: flex;
		flex-direction: column;
		gap: 14px;
		margin-top: 4px;
	}
	.row {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		text-decoration: none;
		color: var(--text);
		font-size: var(--text-sm);
		font-family: var(--font-sans);
		text-align: left;
		transition: color var(--dur-fast);
	}
	.row:hover {
		color: var(--accent-400);
	}
	.ico {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border-radius: var(--radius-md);
		background: var(--surface-900);
		border: 1px solid var(--border-700);
		color: var(--accent-500);
		flex-shrink: 0;
	}
	.mono {
		font-family: var(--font-mono);
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: clamp(22px, 3vw, 30px);
		background: var(--surface-900);
		border: 1px solid var(--border-700);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-panel);
	}
	.flash {
		padding: 12px 14px;
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
	}
	.flash.ok {
		background: color-mix(in srgb, var(--success-strong) 18%, transparent);
		border: 1px solid color-mix(in srgb, var(--success-strong) 35%, transparent);
		color: var(--success-text);
	}
	.flash.err {
		background: color-mix(in srgb, var(--danger) 20%, transparent);
		border: 1px solid color-mix(in srgb, var(--danger) 40%, transparent);
		color: var(--danger-text);
	}
</style>
