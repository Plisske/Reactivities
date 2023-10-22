import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    //setting these properties as defaults inside main function, optionality for prototype func.
    inverted?: boolean; //for background
    content?: string; //loading text
}

export default function LoadingComponent({ inverted = true, content = 'Loading...' }: Props) {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}