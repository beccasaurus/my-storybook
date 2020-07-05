import * as React from 'react';
import { connect } from 'react-redux';
import * as things from './things';
import { State } from './store';
import * as shortid from 'shortid';
import { Dispatch, AnyAction } from 'redux';

const mapStateToProps = (state: State) => ({
  things: things.selectors.selectAll(state.things),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  addThing: (thing: things.Thing) => dispatch(things.actions.addThing(thing)),
  removeThing: (id: string) => dispatch(things.actions.removeThing(id)),
});

export type Props = {
  /** These are the things! */
  things: Array<things.Thing>;
  addThing: (thing: things.Thing) => void;
  removeThing: (id: string) => void;
};

/**
 * This is the component!
 */
export function DisconnectedListOfThings({ things, addThing, removeThing }: Props) {
  const [newThingName, setNewThingName] = React.useState('New thing name here');
  const addNewThing = () => {
    const thing = { id: shortid.generate(), name: newThingName };
    addThing(thing);
  };
  return (
    <>
      <h1>Things</h1>
      <ul>
        {things.map((thing) => (
          <li key={thing.id}>
            <span>{thing.name}</span>
            <span onClick={() => removeThing(thing.id)}>✖</span>
          </li>
        ))}
      </ul>
      <input value={newThingName} onChange={(e) => setNewThingName(e.currentTarget.value)} />
      <button onClick={addNewThing}>Add Thing</button>
    </>
  );
}

export const ListOfThings = connect(mapStateToProps, mapDispatchToProps)(DisconnectedListOfThings);

export default ListOfThings;
