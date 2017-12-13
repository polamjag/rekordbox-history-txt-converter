import React from 'react';
import Head from 'next/head'

export default class extends React.Component {
    constructor () {
        super();

        this.state = {
            sourceText: '',
        };
    }    

    handleInput (event) {
        this.setState({
            sourceText: event.currentTarget.value,
        });
    }

    calculateMixcloudFormat () {
        return this.state.sourceText.split('\n').map(line => {
            const matches = line.match(/^\d+\t\t([^\t]*)\t([^\t]*)\t.*/);

            if (matches && matches[1] && matches[2]) {
                return `${matches[1].replace(' - ', ' — ')} - ${matches[2].replace(' - ', ' — ')}`;
            }
            else {
                return null;
            }
        }).filter(el => !!el).join('\n');
    }

    selectAll (event) {
        event.currentTarget.select();
    }

    render () {
        return (
            <div>
                <Head>
                    <title>rekordbox's *.txt history to Mixcloud format</title>
                </Head>
                <section>
                    <h1>rekordbox's *.txt history to Mixcloud format converter</h1>
                    <div className="textareas">
                        <textarea onChange={e => this.handleInput(e)} value={this.state.sourceText} placeholder="paste content of 'HISTORY YYYY-MM-DD.txt' here" />
                        <textarea readOnly={true} value={this.calculateMixcloudFormat()} placeholder="(result will be shown here)" onFocus={e => this.selectAll(e)} onClick={e => this.selectAll(e)} />
                    </div>
                </section>
                <style jsx>
                {`
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Meiryo, sans-serif;
                    }
                    h1 {
                        font-size: 1.3em;
                        margin: 0 0 .6em 0;
                    }
                    section {
                        display: flex;
                        flex: 1 0 auto;
                        flex-flow: column;
                        justify-content: flex-start;

                        position: absolute;
                        top: 0;
                        right: 0;
                        left: 0;
                        bottom: 0;
                        padding: .8em;
                    }
                    .textareas {
                        display: flex;

                        flex-grow: 1;
                        justify-content: space-between;
                        
                        align-self: stretch;
                        align-items: stretch;
                        align-content: stretch;
                    }
                    textarea {
                        display: block;
                        border: 2px solid #999;
                        padding: .4em;
                        font-family: monospace;
                        font-size: 1.1em;
                        resize: none;
                        flex: 1 0 auto;
                    }
                    textarea:not(:first-child) {
                        margin-left: .6em;
                    }
                    textarea[readonly] {
                        color: .8;
                        background: #f6f6f6;
                    }
                `}
                </style>
            </div>
        );
    }
}