import { produce } from 'immer';
import { RootAction } from '../actions-types/root-reducer.actions-types';
import { RootTypes } from '../types';
import { IRootState } from '../interfaces';
import { createEmptyCard, createMainStates, selectCard } from './scripts';

const initialState: IRootState = {
  stateMDContent: [],
  preactState: [],
  selectedElem: {
    id: '',
    depth: 0,
    children: [],
    parents: [],
    neighbors: [],
    scrollChildren: [],
  },
  firstRender: '',
  isEdit: false,
  removeContent: false,
};

export const rootReducer = produce((draft: IRootState, action: RootAction) => {
  switch (action.type) {
    case RootTypes.CREATE_MAIN_STATES:
      createMainStates(draft, action.payload);
      break;

    case RootTypes.CREATE_EMPTY_CARD:
      createEmptyCard(draft, action.payload);
      break;

    case RootTypes.CHANGE_FIRST_RENDER:
      draft.firstRender = action.payload;
      break;

    case RootTypes.CLICK_CARD_VIEW:
      selectCard(draft, action.payload);
      break;

    case RootTypes.ADD_CARD_RIGHT:
      draft.preactState.push(action.payload);
      break;

    case RootTypes.ADD_CARD_VERTICALLY:
      draft.preactState.push(action.payload);
      break;

    case RootTypes.CHANGE_CARD:
      const { isEdit, newContent } = action.payload;
      draft.isEdit = isEdit;
      if (isEdit) {
        draft.stateMDContent[draft.selectedElem.id].markdownContent = newContent;
      }
      break;

    case RootTypes.DELETE_CARD:
      draft.stateMDContent.splice(draft.selectedElem.id, 1);
      draft.preactState = [];
      break;

    case RootTypes.TOGGLE_CARD_EDIT:
      const cardId = action.payload;
      draft.stateMDContent[cardId].isEdit = !draft.stateMDContent[cardId].isEdit;
      break;

    default:
      return draft;
  }
}, initialState);