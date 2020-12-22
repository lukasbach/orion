import React from 'react';
import { Meta } from '@storybook/react';
import { useCompletionStore } from '../../components/useCompletionStore';

(window as any).noTelemetry = true;

export default {
  title: 'Store/Store Debugging',
} as Meta;

export const ShowStoreContents: React.FC = () => {
  const store = useCompletionStore();
  return (
    <pre>
      <code dangerouslySetInnerHTML={{ __html: JSON.stringify(store.finishedLevels, null, 2) }} />
    </pre>
  );
};


export const ClearStore: React.FC = () => {
  const store = useCompletionStore();
  return (
    <div>
      <button onClick={() => store.resetStore()}>
        Clear
      </button>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: JSON.stringify(store.finishedLevels, null, 2) }} />
      </pre>
    </div>
  );
};