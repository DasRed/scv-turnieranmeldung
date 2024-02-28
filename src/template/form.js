export default (error = undefined) => `
    ${error === undefined ? '' : `<div class="error">${error}</div>`}
    <form action="." method="post">
        <label for="age">Alterklasse:</label>
        <select name="age" required>
            <option value='U7'>U7 Jg. 2017 - 14.07.2024 - 10:00</option>
            <option value='U8'>U8 Jg. 2016 - 13.07.2024 - 12:30</option>
            <option value='U9'>U9 Jg. 2015 - 13.07.2024 - 09:30</option>
            <option value='U10'>U10 Jg. 2014 - 13.07.2024 - 14:30</option>
            <option value='U11'>U11 Jg. 2013 - 14.07.2024 - 12:00</option>
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

        <input type="hidden" name="action" value="save"/>
        <button type="submit">Anmelden</button>
    </form>
`;
