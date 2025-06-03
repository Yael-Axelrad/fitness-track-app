import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Sparkles } from "lucide-react";

const classesData = [
  { title: "חוג יוגה לנשים", desc: "שיפור גמישות ונשימה באווירה נשית 🌸", color: "pink" },
  { title: "אימון פונקציונלי", desc: "כוח, סיבולת ואתגר 💪", color: "mint" },
  { title: "כושר לילדים", desc: "כף, קואורדינציה וביטחון עצמי 🎈", color: "sky" },
  { title: "חיזוק ובריאות", desc: "חיזוק הגוף עם אנרגיה צהובה ☀️", color: "yellow" },
];

const ClassesSection = () => (
  <section className="classes-section" id="classes">
    {classesData.map((item, index) => (
      <Card key={index} className={`class-card ${item.color}`}>
        <CardContent>
          <Sparkles size={36} color="#fff" />
          <Typography variant="h6" className="card-title">{item.title}</Typography>
          <Typography variant="body2" className="card-desc">{item.desc}</Typography>
        </CardContent>
      </Card>
    ))}
  </section>
);

export default ClassesSection;

