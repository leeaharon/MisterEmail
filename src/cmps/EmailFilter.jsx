import { useEffect, useState } from "react"

export function EmailFilter({ onSetFilter }) {
    const [filterByToEdit, setfilterByToEdit] = useState({ subject: '' })

    useEffect(() => {
       onSetFilter(filterByToEdit)

    }, [filterByToEdit])
    

    function handleSubjectChange(ev) {
        const { value } = ev.target
        console.log("value",value)
        console.log("ev", ev)
        setfilterByToEdit((prevFilter) => ({ ...prevFilter, subject: value }))

    }
    function onSubmitFilter(ev) {
        ev.preventDefault()//מבטל רפרוש שלוחצים submit
        console.log("filterbytoedis",filterByToEdit)

        onSetFilter(filterByToEdit)
    }

    return (
        <form className="email-filter" onSubmit={onSubmitFilter}>
            <label htmlFor="subject">subject: </label>
            <input type="text" id="subject" placeholder="search by subject message"
                onChange={handleSubjectChange}
                value={filterByToEdit.subject} />

            <button>Search</button>

        </form>

    )
}
