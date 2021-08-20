import React from 'react';

import styles from './Btns.module.scss';

export function ExitButton({ closeFunction }) {
	return (
		<svg className={styles.exitButton} onClick={closeFunction} alt='exit' viewBox="0 0 456.339 456.339">
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

export function CancelButton({ onClick }) {
	return (
		<svg className={styles.cancelButton} onClick={onClick} viewBox="0 0 32 32">
			<path d="M4,29a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l24-24a1,1,0,1,1,1.42,1.42l-24,24A1,1,0,0,1,4,29Z" />
			<path d="M28,29a1,1,0,0,1-.71-.29l-24-24A1,1,0,0,1,4.71,3.29l24,24a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z" />
		</svg>
	)
}

export function SimpleButton({ value, onClick }) {
	return (
		<button className={styles.SimpleButton} onClick={onClick} ><span>{value}</span></button>
	)
}

export function HoverButton({ value, onClick, valueOnHover }) {
	return (
		<button className={styles.FriendButton} onClick={onClick} >
			<span className={styles.standard}>{value}</span>
			<span className={styles.onHover}>{valueOnHover}</span>
		</button>
	)
}

export function MenuButton({ menuButtonValue, menuCells = [] }) {

	const [opened, setOpened] = React.useState(false);

	const handleClickMenu = () => {
		setOpened(!opened);
	}
	const handleCloseMenu = () => {
		setOpened(false);
	}
	const handleClickCell = (cell) => {
		cell.onClick();
		handleCloseMenu();
	}
	return (
		<div className={styles.Menu}>
			<button className={styles.MenuButton} onClick={handleClickMenu} ><span>{menuButtonValue}</span></button>
			{opened &&
				<ul className={styles.MenuContent}>
					{menuCells.map(cell => (
						<li onClick={() => handleClickCell(cell)}><span>{cell.value}</span></li>
					))}
				</ul>
			}
		</div>
	)
}

export function SubmitButton({ value }) {
	return (
		<button className={styles.SimpleButton} type='submit'>{value}</button>
	)
}

export function AttachButton({ onClick }) {
	const attachFile = React.useRef(null);

	const handleAttachmentButtonClick = () => {
		attachFile.current.click();
	}

	return (
		<>
			<input className={styles.attachBox}
				onClick={onClick}
				type='file'
				accept=".png, .jpg, .jpeg"
				ref={attachFile}
			/>
			<svg className={styles.attachSvg} onClick={handleAttachmentButtonClick} alt='attach' viewBox="0 0 280.067 280.067">
				<path d="M149.823,257.142c-31.398,30.698-81.882,30.576-113.105-0.429
		c-31.214-30.987-31.337-81.129-0.42-112.308l-0.026-0.018L149.841,31.615l14.203-14.098c23.522-23.356,61.65-23.356,85.172,0
		s23.522,61.221,0,84.586l-125.19,123.02l-0.044-0.035c-15.428,14.771-40.018,14.666-55.262-0.394
		c-15.244-15.069-15.34-39.361-0.394-54.588l-0.044-0.053l13.94-13.756l69.701-68.843l13.931,13.774l-83.632,82.599
		c-7.701,7.596-7.701,19.926,0,27.53s20.188,7.604,27.88,0L235.02,87.987l-0.035-0.026l0.473-0.403
		c15.682-15.568,15.682-40.823,0-56.39s-41.094-15.568-56.776,0l-0.42,0.473l-0.026-0.018l-14.194,14.089L50.466,158.485
		c-23.522,23.356-23.522,61.221,0,84.577s61.659,23.356,85.163,0l99.375-98.675l14.194-14.089l14.194,14.089l-14.194,14.098
		l-99.357,98.675C149.841,257.159,149.823,257.142,149.823,257.142z"/>
			</svg>
		</>
	)
}
