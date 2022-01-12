import React, {useEffect, useState} from 'react';
import {Terminal, TerminalEvent} from './index';
import {usePrevious} from '../../utils/usePrevious';

export type UseCommandResult = {
  start: () => void;
  stop: () => void;
  output: string;
  isRunning: boolean;
};

export type UseCommandProps = {
  commandValue: string;
};

export const useCommand = ({
  commandValue,
}: UseCommandProps): UseCommandResult => {
  const [output, setOutput] = useState('');
  const [isRunning, setIsRuning] = useState(false);

  const [lastOutput, setLastOutput] = useState('');

  const prevLastOutput = usePrevious(lastOutput);

  useEffect(() => {
    const outputListener = Terminal.addEventListener(
      TerminalEvent.EVENT_COMMAND_OUTPUT,
      ({outputText}) => {
        setLastOutput(outputText);
      },
    );
    const finishListener = Terminal.addEventListener(
      TerminalEvent.EVENT_COMMAND_FINISHED,
      () => {
        setIsRuning(false);
      },
    );
    return () => {
      Terminal.removeSubscription(outputListener);
      Terminal.removeSubscription(finishListener);
    };
  }, []);

  useEffect(() => {
    if (lastOutput !== prevLastOutput) {
      setOutput(output + lastOutput);
    }
  }, [lastOutput, output, prevLastOutput]);

  const start = () => {
    setOutput('');
    setIsRuning(true);
    Terminal.runCommand(commandValue);
  };

  const stop = () => {
    Terminal.stopCommand();
  };

  return {
    start,
    stop,
    output,
    isRunning,
  };
};
