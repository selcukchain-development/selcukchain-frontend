"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Plus, Edit, Trash2 } from "lucide-react";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  EventData
} from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Event {
  _id: string;
  title: string;
  description: string;
  link: string;
  type: "Education" | "Talk" | "Workshop";
  date: string;
  details: {
    fullDescription: string;
    duration: string;
    schedule: string;
    location: string;
    maxParticipants: number;
    organizer: string;
    syllabus: string[];
    image: string;
  };
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    setIsLoading(false);
  };

  const handleCreateOrUpdateEvent = async (eventData: EventData) => {
    try {
      if (currentEvent) {
        await updateEvent(currentEvent._id, eventData);
      } else {
        await createEvent(eventData);
      }
      fetchEvents();
      setIsDialogOpen(false);
      setCurrentEvent(null);
    } catch (error) {
      console.error("Error creating/updating event:", error);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm("Etkinliği silmek istediğinize emin misiniz?")) {
      try {
        await deleteEvent(id);
        fetchEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center">
          <Calendar className="h-8 w-8 mr-3 text-purple-500" />
          <h1 className="text-3xl font-bold text-gray-800">Etkinlikler</h1>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Yeni Etkinlik
        </Button>
      </motion.div>

      {isLoading ? (
        <p className="text-center text-gray-600">Etkinlikler yükleniyor...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Başlık</TableHead>
              <TableHead>Tür</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event._id}>
                <TableCell className="text-gray-800">{event.title}</TableCell>
                <TableCell className="text-gray-800">{event.type}</TableCell>
                <TableCell className="text-gray-800">
                  {new Date(event.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setCurrentEvent(event);
                      setIsDialogOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4 mr-2" /> Düzenle
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleDeleteEvent(event._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Sil
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              {currentEvent ? "Etkinliği Düzenle" : "Yeni Etkinlik Oluştur"}
            </DialogTitle>
          </DialogHeader>
          <EventForm
            initialData={currentEvent}
            onSubmit={handleCreateOrUpdateEvent}
            onCancel={() => {
              setIsDialogOpen(false);
              setCurrentEvent(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface EventFormProps {
  initialData: Event | null;
  onSubmit: (eventData: EventData) => void;
  onCancel: () => void;
}
function EventForm({ initialData, onSubmit, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        ...initialData,
        date: new Date(initialData.date).toISOString().split('T')[0], // Date'i string formatına çevir
      };
    }
    return {
      title: '',
      description: '',
      link: '',
      type: 'Education' as const,
      date: '',
      details: {
        fullDescription: '',
        duration: '',
        schedule: '',
        location: '',
        maxParticipants: 0,
        organizer: '',
        syllabus: [],
        image: ''
      }
    };
  });
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => {
      if ('details' in prevData) {
        return {
          ...prevData,
          details: {
            ...prevData.details,
            [name]: value,
          },
        };
      }
      return prevData;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submittedData: EventData = {
      ...formData,
      date: new Date(formData.date),
    };
    onSubmit(submittedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Etkinlik Başlığı</h3>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Etkinlik Başlığı"
            required
            className="bg-gray-100 text-gray-800 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Etkinlik Linki</h3>
          <Input
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="Etkinlik Linki"
            required
            className="bg-gray-100 text-gray-800 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Etkinlik Türü</h3>
          <Select
            name="type"
            value={formData.type}
            onValueChange={(value: "Education" | "Talk" | "Workshop") =>
              setFormData((prevData: any) => ({ ...prevData, type: value }))
            }
          >
            <SelectTrigger className="bg-gray-100 text-gray-800 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200">
              <SelectValue placeholder="Etkinlik Türü Seçin" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Education" className="text-gray-800">Eğitim</SelectItem>
              <SelectItem value="Talk" className="text-gray-800">Konuşma</SelectItem>
              <SelectItem value="Workshop" className="text-gray-800">Atölye</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Etkinlik Tarihi</h3>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="bg-gray-100 text-gray-800 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
          />
        </div>
        <div className="md:col-span-2">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Kısa Açıklama</h3>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Kısa Açıklama"
            required
            className="bg-gray-100 text-gray-800 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
          />
        </div>
        <div className="md:col-span-2">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Detaylı Açıklama</h3>
          <Textarea
            name="fullDescription"
            value={formData.details.fullDescription}
            onChange={handleDetailsChange}
            placeholder="Detaylı Açıklama"
            className="bg-gray-100 text-gray-800 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Etkinlik Süresi</h3>
          <Input
            name="duration"
            value={formData.details.duration}
            onChange={handleDetailsChange}
            placeholder="Süre"
            className="bg-gray-100 text-gray-800 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Etkinlik Programı</h3>
          <Input
            name="schedule"
            value={formData.details.schedule}
            onChange={handleDetailsChange}
            placeholder="Program"
            className="bg-gray-100 text-gray-800 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Etkinlik Konumu</h3>
          <Input
            name="location"
            value={formData.details.location}
            onChange={handleDetailsChange}
            placeholder="Konum"
            className="bg-gray-100 text-gray-800 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Maksimum Katılımcı Sayısı</h3>
          <Input
            type="number"
            name="maxParticipants"
            value={formData.details.maxParticipants}
            onChange={handleDetailsChange}
            placeholder="Maksimum Katılımcı Sayısı"
            className="bg-gray-100 text-gray-800 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Organizatör</h3>
          <Input
            name="organizer"
            value={formData.details.organizer}
            onChange={handleDetailsChange}
            placeholder="Organizatör"
            className="bg-gray-100 text-gray-800 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Etkinlik Görseli</h3>
          <Input
            name="image"
            value={formData.details.image}
            onChange={handleDetailsChange}
            placeholder="Görsel URL"
            className="bg-gray-100 text-gray-800 border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          İptal
        </Button>
        <Button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          Kaydet
        </Button>
      </div>
    </form>
  );
}
