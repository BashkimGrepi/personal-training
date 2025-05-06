import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import { getTrainings } from '../services/TrainingsService';

function TrainingCalendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const data = await getTrainings();
                console.log("Training object:", data);

                const formattedData = data.map((training) => {
                    const start = new Date(training.date);
                    const end = new Date(start.getTime() + training.duration * 60000); // duration in minutes

                    return {
                        title: `${training.activity} (${training.customer?.firstname || "?"})`,
                        start: start.toISOString(),
                        end: end.toISOString(),
                        extendedProps: {
                            customer: training.customer,
                            duration: training.duration,
                        },
                    };
                });

                setEvents(formattedData);
            } catch (err) {
                console.error("Error fetching trainings", err);
            }
        };

        fetchTrainings();
    }, []);

    return (
        <div className="p-4">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={events}
                height="auto"
            />
        </div>
    );
}

export default TrainingCalendar;
