<script>
    let className = '';
    export { className as class };
</script>

<style>
.square-bracket {
  background-image: linear-gradient(var(--colour), var(--colour)),
                    linear-gradient(var(--colour), var(--colour)),
                    linear-gradient(var(--colour), var(--colour)),
                    linear-gradient(var(--colour), var(--colour));

  background-repeat: no-repeat;
  background-size: 8px var(--border);
  background-position: top left, top right, bottom left, bottom right;

  border: solid var(--colour);
  border-width: 0 var(--border);
}
</style>

<div class="square-bracket transition {className}">
    <slot></slot>
</div>