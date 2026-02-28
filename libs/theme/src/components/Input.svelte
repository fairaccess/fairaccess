<script lang="ts">
  import "./Input.css";

  export let value: string | number = '';
</script>

<input bind:value data-input {...$$restProps} />
