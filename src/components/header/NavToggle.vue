<template>
    <div
        id="nav-toggle"
        class="nav-toggle"
        :class="{active: isActive}"
    >
        <button
            class="nav-toggle__button"
            type="button"
        >
            <span class="nav-toggle__item">
                <span />
            </span>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        isActive: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style>
    .nav-toggle {
        display: flex;
    }

    .nav-toggle__button {
        outline: 0;
        cursor: pointer;
        justify-content: space-between;
        border: 0;
        background: 0;
        /* display: none;
        font-size: 0;
        color: transparent;
        */
    }

    .nav-toggle__item {
        display: flex;
        position: relative;
        width: 20px;
        height: 2px;
        background-color: #e6c269;
    }

    .nav-toggle__item:before,
    .nav-toggle__item:after {
        content: "";
        width: 20px;
        height: 2px;
        background-color: #e6c269;
        position: absolute;
        z-index: 1;
        transition: transform .2s linear;
    }

    .nav-toggle__item:before {
        top: -6px;
    }

    .nav-toggle__item:after {
        bottom: -6px;
    }

    .nav-toggle .nav-toggle__item {
        transition-duration: 0.2s;
        transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
    }

    .nav-toggle .nav-toggle__item:before,
    .nav-toggle .nav-toggle__item:after {
        transition-duration: 0s;
        transition-delay: 0.1s;
        transition-timing-function: linear;
    }

    .nav-toggle .nav-toggle__item:before {
        transition-property: top, opacity;
    }

    .nav-toggle .nav-toggle__item:after {
        transition-property: bottom, opacity;
    }

    .nav-toggle.active {
        transform: rotate(-765deg);
        transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
    }

    .nav-toggle.active .nav-toggle__item:before,
    .nav-toggle.active .nav-toggle__item:after {
        transition-delay: 0s;
    }

    .nav-toggle.active .nav-toggle__item:before {
        top: 0;
        opacity: 0;
    }

    .nav-toggle.active .nav-toggle__item:after {
        bottom: 0;
        transform: rotate(-90deg); }
</style>
