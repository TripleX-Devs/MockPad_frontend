import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, User } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define types for the semester data
type Circular = {
  id: number;
  title: string;
  date: string;
};

type Subject = {
  name: string;
  attendance: number;
  presentDays: number;
  absentDays: number;
  totalClasses: number;
  lastAttendance: string;
};

type SemesterData = {
  [key: string]: {
    circulars: Circular[];
    subjects: Subject[];
  };
};

// Mock data for multiple semesters
const semesterData: SemesterData = {
  "Fall 2023": {
    circulars: [
      { id: 1, title: "Fall Semester Start", date: "2023-09-01" },
      { id: 2, title: "Midterm Exams Schedule", date: "2023-10-15" },
      { id: 3, title: "Thanksgiving Break", date: "2023-11-20" },
    ],
    subjects: [
      { name: "Mathematics", attendance: 92, presentDays: 46, absentDays: 4, totalClasses: 50, lastAttendance: "2023-11-30" },
      { name: "Science", attendance: 88, presentDays: 44, absentDays: 6, totalClasses: 50, lastAttendance: "2023-11-29" },
      { name: "English", attendance: 96, presentDays: 48, absentDays: 2, totalClasses: 50, lastAttendance: "2023-11-30" },
    ]
  },
  "Spring 2024": {
    circulars: [
      { id: 4, title: "Spring Semester Start", date: "2024-01-15" },
      { id: 5, title: "Spring Break Announcement", date: "2024-03-10" },
      { id: 6, title: "Final Exams Schedule", date: "2024-05-01" },
    ],
    subjects: [
      { name: "Mathematics", attendance: 90, presentDays: 45, absentDays: 5, totalClasses: 50, lastAttendance: "2024-05-10" },
      { name: "Science", attendance: 94, presentDays: 47, absentDays: 3, totalClasses: 50, lastAttendance: "2024-05-11" },
      { name: "English", attendance: 98, presentDays: 49, absentDays: 1, totalClasses: 50, lastAttendance: "2024-05-12" },
      { name: "History", attendance: 86, presentDays: 43, absentDays: 7, totalClasses: 50, lastAttendance: "2024-05-09" },
    ]
  }
}

const currentDate = new Date().toISOString().split('T')[0]

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const [selectedSemester, setSelectedSemester] = useState("Spring 2024")

  const circulars = semesterData[selectedSemester].circulars
  const subjects = semesterData[selectedSemester].subjects

  const filteredCirculars = circulars.filter(circular => circular.date <= selectedDate)
  const currentDateCirculars = circulars.filter(circular => circular.date === currentDate)

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        <header className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg" alt="Student" />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome, John Doe</h1>
              <p className="text-gray-500">Student ID: S12345</p>
            </div>
          </div>
          <Select onValueChange={setSelectedSemester} defaultValue={selectedSemester}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(semesterData).map((semester) => (
                <SelectItem key={semester} value={semester}>{semester}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </header>

        <main>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="circulars">Circulars</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((subject) => (
                  <Card key={subject.name}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {subject.name} Attendance
                      </CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{subject.attendance}%</div>
                      <Progress value={subject.attendance} className="mt-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Today's Circulars</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentDateCirculars.length > 0 ? (
                    <ul className="space-y-2">
                      {currentDateCirculars.map((circular) => (
                        <li key={circular.id} className="flex justify-between items-center">
                          <span>{circular.title}</span>
                          <span className="text-sm text-gray-500">{circular.date}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No circulars for today.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="circulars">
              <Card>
                <CardHeader>
                  <CardTitle>School Circulars</CardTitle>
                  <CardDescription>Stay updated with the latest announcements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Select onValueChange={setSelectedDate} defaultValue={currentDate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by date" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...new Set(circulars.map(c => c.date))].sort().map((date) => (
                          <SelectItem key={date} value={date}>{date}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <ul className="space-y-4">
                    {filteredCirculars.map((circular) => (
                      <li key={circular.id} className="border-b pb-2">
                        <h3 className="font-semibold">{circular.title}</h3>
                        <p className="text-sm text-gray-500">Date: {circular.date}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Attendance Report</CardTitle>
                  <CardDescription>Your attendance across all subjects for {selectedSemester}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">
                    {subjects.map((subject) => (
                      <li key={subject.name} className="border-b pb-4">
                        <h3 className="font-semibold text-lg mb-2">{subject.name}</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Present Days: {subject.presentDays}</div>
                          <div>Absent Days: {subject.absentDays}</div>
                          <div>Total Classes: {subject.totalClasses}</div>
                          <div>Attendance: {subject.attendance}%</div>
                          <div className="col-span-2">Last Attendance: {subject.lastAttendance}</div>
                        </div>
                        <Progress value={subject.attendance} className="mt-2" />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

