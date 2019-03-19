<template>
    <div class="progress">
        <div
            aria-valuemax="100"
            aria-valuemin="0"
            :aria-valuenow="progression"
            class="progress-bar progress-bar-striped"
            role="progressbar"
            ref="progressbar"
        >{{ progression }}%</div>
    </div>
</template>

<script>
    export default {
        name: "progress-bar",
        props: {
            progression: Number,
            default: 0
        },
        watch: {
            progression() {
                this.$refs.progressbar.style.width = this.progression + '%';
            }
        },
    }
</script>

<style scoped>
    .progress {
        height: 1.75rem;
        font-size: 1.2rem;
        border: 1px solid #ced4da;
    }

    .progress-bar {
        min-width: 4%;
    }
</style>
