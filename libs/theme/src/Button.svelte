<script>
  export let label = "Cliasdasck me";
  export let onClick = () => {};
</script>

<button on:click={onClick} class="button">
  {label}
</button>

<style>
  .button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .button:hover {
    background-color: #0056b3;
  }

  .button:active {
    background-color: #004085;
  }
</style>
