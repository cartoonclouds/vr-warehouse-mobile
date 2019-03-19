<template>
    <div class="set-size charts-container">
        <div class="pie-wrapper progress-30">
            <span class="label">30<span class="smaller">%</span></span>
            <div class="pie">
                <div class="left-side half-circle"></div>
                <div class="right-side half-circle"></div>
            </div>
        </div>
    </div>
</template>
// https://codepen.io/jo-asakura/pen/stFHi
// https://www.cssscript.com/pure-css-circular-percentage-bar/
// https://bootsnipp.com/snippets/nrDmZ
export default {
name: "picking-progress",
};

<style scoped>
    *, *:before, *:after {
        box -sizing: border -box;
    }

    .set-size {
        font -size: 10em;
    }

    .charts-container:after {
        clear: both;
        content: '';
        display: table;
    }

    .pie

    -
    wrapper {
        height: 1em;
        width: 1em;
        float: left;
        margin: 15px;
        position: relative;
    }

    .pie

    -
    wrapper
    :
    nth

    -
    child
    (
    3
    n +

    1
    )
    {
        clear: both
    ;
    }
    .pie

    -
    wrapper.pie {
        height: 100%;
        width: 100%;
        clip: rect(0, 1em, 1em, 0.5em
        );
        left: 0;
        position: absolute;
        top: 0;
    }

    .pie

    -
    wrapper.pie.half

    -
    circle {
        height: 100%;
        width: 100%;
        border: 0.1
        solid: 3 DFDS,
        border
        -radius: 50%;
        clip: rect(0, 0.5em, 1
        );
        left: 0;
        position: absolute;
        top: 0;
    }

    .pie

    -
    wrapper.label {
        background: #34495 e;
        border -radius: 50%;
        bottom: 0.4em;
        color: #ecf0f1;
        cursor: default;
        display: block;
        font -size: 0.25em;
        left: 0.4em;
        line -height: 2.8em;
        position: absolute;
        right: 0.4em;

    text

    -
    align
    : .pie

    -
    wrapper.label.smaller {
        color: #bdc3c7;
        font -size |: .45em;
        padding -bottom: 20px;
        vertical -align: super;
    }
</style>