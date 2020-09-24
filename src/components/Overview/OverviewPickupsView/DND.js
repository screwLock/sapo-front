import React, { useRef } from 'react';
import { useControllableValue, useDynamicList } from '@umijs/hooks';
import SpringList from 'react-spring-dnd';

const initValue = ['']
const DND = props => {

  // list
  const [value = props.pickups, setValue] = useControllableValue(props);
  const { list, getKey, remove, insert } = useDynamicList(initValue);

  // order
  const order = useRef(list.map((_, index) => index));
  const onDragEnd = newOrder => {
    order.current = newOrder;
  };

  return (
    <div>
      <SpringList onDragEnd={onDragEnd} addType="insert">
        {list.map((_, index) => {
          const key = getKey(index);
          return (
            <div key={key}>
              {list.length < 1 && (
                'No Pickups for this day'
              )}
            </div>
          );
        })}
      </SpringList>
    </div>
  );
};

export default DND;