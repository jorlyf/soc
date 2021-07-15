import React from 'react';

import styles from './Btns.module.scss';

export function ExitBtn({ closeFunction }) {
    return (
        <svg className={styles.exit} onClick={closeFunction} alt='exit' viewBox="0 0 456.339 456.339">
            <path d="M227.771,456.337c-38.235,0-76.687-9.533-111.516-29.143c-6.462-3.637-8.753-11.827-5.112-18.289
		c3.637-6.455,11.82-8.763,18.289-5.112c78.341,44.11,177.506,30.451,241.168-33.2c78.53-78.534,78.53-206.31,0-284.844
		c-78.534-78.534-206.317-78.54-284.858,0c-78.53,78.534-78.53,206.31,0,284.844c5.245,5.245,5.245,13.75,0,18.995
		c-5.238,5.245-13.743,5.245-18.988,0c-89.003-89.01-89.003-233.824,0-322.834c89.003-89.003,233.831-89.003,322.834,0
		c89.003,89.01,89.003,233.824,0,322.834C345.746,433.426,287.022,456.337,227.771,456.337z"/>
            <path d="M299.478,317.293c-3.437,0-6.871-1.308-9.494-3.931L147.367,170.745c-5.245-5.245-5.245-13.75,0-18.995
		c5.245-5.245,13.743-5.245,18.988,0l142.618,142.618c5.245,5.245,5.245,13.75,0,18.995
		C306.35,315.986,302.916,317.293,299.478,317.293z"/>
            <path d="M156.861,317.293c-3.437,0-6.871-1.308-9.494-3.931c-5.245-5.245-5.245-13.75,0-18.995L289.984,151.75
		c5.245-5.245,13.743-5.245,18.988,0s5.245,13.75,0,18.995L166.355,313.363C163.732,315.986,160.298,317.293,156.861,317.293z"/>
        </svg>
    )
}
