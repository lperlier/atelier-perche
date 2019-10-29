exports.onRenderBody = ({ setBodyAttributes }) => {
  setBodyAttributes({
      className: 'is-first is-loading is-animating'
    });
};
