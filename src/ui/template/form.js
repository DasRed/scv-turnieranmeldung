export default ({ages, error = undefined}) => `
    ${error === undefined ? '' : `<div class="error">${error}</div>`}
    <form action="" method="post">
        <p>
            Gehen mehr Anmeldungen ein als Plätze frei sind, entscheidet der Termin der Anmeldung. Ihr werdet aber in jedem Fall informiert.
        </p>
                
        <label for="age">Alterklasse:</label>
        <select name="age" required>
            ${Object.entries(ages).map(([value, text]) => `<option value='${value}'>${text}</option>`).join('')}
        </select>

        <label for="association">Vereinsname:</label>
        <input type="text" name="association" required>

        <label for="team">Mannschaft:</label>
        <input type="text" name="team" required>

        <label for="coach">Name des Trainer:</label>
        <input type="text" name="coach" required>

        <label for="email">Email des Trainer:</label>
        <input type="email" name="email" required>

        <label for="mobile">Telefon des Trainer:</label>
        <input type="tel" name="mobile" required>

        <button type="submit">Anmelden</button>

        <p>
        
        </p>
    </form>
`;
