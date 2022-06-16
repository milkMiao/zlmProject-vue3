const { ref, effect } = require("@vue/reactivity");
var blessed = require("blessed");

// Create a screen object.
// init
// const val = ref(0);

// setInterval(() => {
//   val.value++;
// }, 100);

// effect(() => {
//   // get -> val
//   box.setContent(`${val.value}%`);

//   screen.render();
// });

const App = {
  render(content) {
    effect(() => { //effect：将函数作为依赖收集起来了
      // reset 重置操作
      // textContent
      if (screen) {
        // reset
        screen.destroy();
      }

      var screen = blessed.screen({
        smartCSR: true,
      });

      var box = blessed.box({
        top: "center",
        left: `${content.left.value}%`,
        width: "50%",
        height: "50%",
        content: "Hello {bold}world{/bold}!",
        tags: true,
        border: {
          type: "line",
        },
        style: {
          fg: "white",
          bg: "magenta",
          border: {
            fg: "#f0f0f0",
          },
        },
      });

      box.on("click", content.handleClick);

      screen.append(box);

      // Quit on Escape, q, or Control-C.
      screen.key(["escape", "q", "C-c"], function (ch, key) {
        return process.exit(0);
      });

      screen.render();
    });
  },

  setup() {
    const left = ref(0);

    setInterval(() => {
      left.value++;
    }, 200);

    function handleClick() {
      left.value = 1;
    }

    return {
      handleClick,
      left,
    };
  },
};

App.render(App.setup());
