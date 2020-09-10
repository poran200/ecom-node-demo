const layout = require('../layout');
const {getError} = require('../../helper');

module.exports = ({errors}) => {
    return layout({
        content: ` <div class="columns is-centered">
        <div class="column is-half">
        <h1 class="subtitle">Create a Product</h1>

    <form method="POST" enctype="multipart/form-data">
        <div class="field">
        <label class="label">Title</label>
        <input class="input" placeholder="Title" name="title">
        <p class="help is-danger">${getError(errors, 'title')}</p>
        </div>

        <div class="field">
        <label class="label">Price</label>
        <input class="input" placeholder="Price" name="price">
        <p class="help is-danger">${getError(errors, 'price')}</p>
        </div>

        <div class="field">      
<!--file-->
        <div class="field">
  <div class="file is-info">
    <label class="file-label">
      <input class="file-input" type="file" name="image"/>
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">
          Image
        </span>
      </span>
    </label>
  </div>
</div>
        </div>
        <br />
        <button class="button is-primary">Create</button>
        </form>
        </div>
        </div>
            `
    });
}
