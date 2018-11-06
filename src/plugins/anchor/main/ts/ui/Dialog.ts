/**
 * Dialog.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import Anchor from '../core/Anchor';

const insertAnchor = function (editor, newId) {
  if (!Anchor.isValidId(newId)) {
    editor.windowManager.alert(
      'Id should start with a letter, followed only by letters, numbers, dashes, dots, colons or underscores.'
    );
    return true;
  } else {
    Anchor.insert(editor, newId);
    return false;
  }
};

const open = function (editor) {
  const currentId = Anchor.getId(editor);

  editor.windowManager.open({
    title: 'Anchor',
    size: 'normal',
    body: {
      type: 'panel',
      items: [
        {
          name: 'id',
          type: 'input',
          label: 'Id'
        }
      ]
    },
    buttons: [
      {
        type: 'cancel',
        name: 'cancel',
        text: 'Cancel'
      },
      {
        type: 'submit',
        name: 'save',
        text: 'Save',
        primary: true
      }
    ],
    initialData: {
      id: currentId
    },
    onSubmit (api) {
      if (!insertAnchor(editor, api.getData().id)) { // TODO we need a better way to do validation
        api.close();
      }
    }
  });
};

export default {
  open
};