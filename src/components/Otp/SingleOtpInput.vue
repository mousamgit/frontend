<template>
  <div style="display: flex; align-items: center;">
    <input
      :type="inputType"
      :placeholder="placeholder"
      :disabled="isDisabled"
      ref="input"
      min="0"
      max="9"
      maxlength="1"
      pattern="[0-9]"
      v-model="model"
      :class="inputClasses"
      @input="handleOnChange"
      @keydown="handleOnKeyDown"
      @paste="handleOnPaste"
      @focus="handleOnFocus"
      @blur="handleOnBlur"
    />
    <span v-if="!isLastChild && separator">
      <span v-html="separator"></span>
    </span>
  </div>
</template>

<script>
import {
  defineComponent, onMounted, ref, Ref, watch,
} from 'vue';

export default defineComponent({
  name: 'SingleOtpInput',
  props: {
    inputType: {
      type: String,
      default: 'tel',
    },
    value: {
      type: [String, Number],
    },
    separator: {
      type: String,
    },
    focus: {
      type: Boolean,
    },
    inputClasses: {
      type: String,
    },
    shouldAutoFocus: {
      type: Boolean,
    },
    isLastChild: {
      type: Boolean,
    },
    placeholder: {
      type: String,
    },
    isDisabled: {
      type: Boolean,
    },
  },
  emits: ['on-change', 'on-keydown', 'on-paste', 'on-focus', 'on-blur'],
  setup(props, { emit }) {
    const model = ref(props.value || '');
    const input = ref(null);

    const handleOnChange = () => {
      model.value = model.value.toString();
      if (model.value.length > 1) {
        model.value = model.value.slice(0, 1);
      }
      return emit('on-change', model.value);
    };

    const isCodeNumeric = (charCode) => (charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105);
    // numeric keys and numpad keys

    const handleOnKeyDown = (event) => {
      if (props.isDisabled) {
        event.preventDefault();
      }
      // Only allow characters 0-9, DEL, Backspace, Enter, Right and Left Arrows, and Pasting
      const keyEvent = event || window.event;
      const charCode = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
      if (isCodeNumeric(charCode) || [8, 9, 13, 37, 39, 46, 86].includes(charCode)) {
        emit('on-keydown', event);
      } else {
        keyEvent.preventDefault();
      }
    };

    const handleOnPaste = (event) => emit('on-paste', event);

    const handleOnFocus = () => {
      input.value.select();
      return emit('on-focus');
    };

    const handleOnBlur = () => emit('on-blur');

    watch(() => props.value, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        // @ts-ignore
        model.value = newValue;
      }
    });
    watch(() => props.focus, (newFocusValue, oldFocusValue) => {
      // Check if focusedInput changed
      // Prevent calling function if input already in focus
      if (oldFocusValue !== newFocusValue && (input.value && props.focus)) {
        input.value.focus();
        input.value.select();
      }
    });

    onMounted(() => {
      if (input.value && props.focus && props.shouldAutoFocus) {
        input.value.focus();
        input.value.select();
      }
    });

    return {
      handleOnChange,
      handleOnKeyDown,
      handleOnPaste,
      handleOnFocus,
      handleOnBlur,
      input,
      model,
    };
  },
});
</script>

<style scoped>
</style>
