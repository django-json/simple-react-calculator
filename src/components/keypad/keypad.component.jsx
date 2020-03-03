import React from 'react';
  
const KeyPad = ({ onClick }) => (
	<div className="keypad">
		<button name="clear" type="button" onClick={onClick}>clear</button>
		<button 
			name="*" 
			type="button" 
			className="operator"
			onClick={onClick}
		>
			*
		</button>
		<button 
			name="/" 
			type="button" 
			className="operator"
			onClick={onClick}
		>
			/
		</button>
		<button name="1" type="button" onClick={onClick}>1</button>
		<button name="2" type="button" onClick={onClick}>2</button>
		<button name="3" type="button" onClick={onClick}>3</button>
		<button 
			name="+" 
			type="button" 
			className="operator"
			onClick={onClick}
		>
			+
		</button>
		<button name="4" type="button" onClick={onClick}>4</button>
		<button name="5" type="button" onClick={onClick}>5</button>
		<button name="6" type="button" onClick={onClick}>6</button>
		<button 
			name="-" 
			type="button" 
			className="operator"
			onClick={onClick}
		>
			-
		</button>
		<button name="7" type="button" onClick={onClick}>7</button>
		<button name="8" type="button" onClick={onClick}>8</button>
		<button name="9" type="button" onClick={onClick}>9</button>
		<button 
			name="=" 
			type="button" 
			className="operator"
			onClick={onClick}
		>
			=
		</button>
	</div>
);

export default KeyPad;