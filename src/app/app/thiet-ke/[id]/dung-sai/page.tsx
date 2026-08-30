"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { ArrowLeft, Info, FileDown } from "lucide-react";
import Link from "next/link";

interface ToleranceTrait {
  id: string;
  name: string;
  desc: string;
  category: 'shape' | 'glaze' | 'firing';
}

const initialTraits: ToleranceTrait[] = [
  { id: "t1", name: "Kích thước (±5%)", desc: "Độ co ngót tự nhiên của đất sét", category: 'shape' },
  { id: "t2", name: "Độ tròn đều", desc: "Sai lệch méo nhẹ do vuốt tay", category: 'shape' },
  { id: "t3", name: "Sắc độ men", desc: "Sự thay đổi tông màu men do nhiệt độ", category: 'glaze' },
  { id: "t4", name: "Vết chảy men", desc: "Giọt men chảy tự nhiên ở mép", category: 'glaze' },
  { id: "t5", name: "Vết rạn men", desc: "Rạn nứt chân chim trên bề mặt", category: 'glaze' },
  { id: "t6", name: "Đốm hỏa biến", desc: "Vết cháy xém ngẫu nhiên do tro củi", category: 'firing' },
  { id: "t7", name: "Vết khói xám", desc: "Ám khói tự nhiên trong lò", category: 'firing' },
];

type ColumnId = 'available' | 'strict' | 'tolerated' | 'unique';

interface ColumnState {
  [key: string]: ToleranceTrait[];
}

export default function ToleranceBuilderPage({ params }: { params: { id: string } }) {
  const [mounted, setMounted] = useState(false);
  
  // Trạng thái của các cột
  const [columns, setColumns] = useState<ColumnState>({
    available: initialTraits,
    strict: [], // Lỗi hỏng (Fault) - Bắt buộc giống mẫu
    tolerated: [], // Đặc tính lò (Kiln effect) - Cho phép sai lệch
    unique: [], // Ngọc quý (Jade) - Độc bản, càng khác càng quý
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceColumn = [...columns[source.droppableId]];
    const destColumn = [...columns[destination.droppableId]];
    const [removed] = sourceColumn.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceColumn.splice(destination.index, 0, removed);
      setColumns({ ...columns, [source.droppableId]: sourceColumn });
    } else {
      destColumn.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn,
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'shape': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'glaze': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'firing': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/app/thiet-ke" className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-heading font-bold">Trình dựng bộ dung sai</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Mẫu ACME-01</span>
            </div>
            <p className="text-muted-foreground text-sm mt-1">Phân loại đặc tính thủ công để đàm phán với khách hàng.</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-accent transition-colors flex items-center">
            <FileDown className="w-4 h-4 mr-2" />
            Bản tiếng Anh (Cho khách)
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            Lưu bộ dung sai
          </button>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold mb-1">Hướng dẫn phân loại 3 nhóm đặc tính (Blueprint §3.6)</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Lỗi hỏng (Faults)</strong>: Bắt buộc giống mẫu chuẩn. Khách có quyền từ chối nếu sai lệch. Báo giá <strong>đắt nhất</strong>.</li>
            <li><strong>Đặc tính lò (Kiln effects)</strong>: Có dung sai theo bảng. Giao tiếp trước để khách chuẩn bị tâm lý. Báo giá <strong>chuẩn</strong>.</li>
            <li><strong>Ngọc quý (Jade)</strong>: Độc bản, không thể kiểm soát. Khách hiểu giá trị ngẫu nhiên. Báo giá <strong>thấp nhất (đẩy rủi ro cho khách)</strong>.</li>
          </ul>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
          
          {/* Cột Available */}
          <div className="flex flex-col bg-muted/50 rounded-xl border p-4">
            <h3 className="font-semibold mb-3 flex items-center justify-between">
              Đặc tính khả dụng
              <span className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">{columns.available.length}</span>
            </h3>
            <Droppable droppableId="available">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="flex-1 overflow-y-auto space-y-3">
                  {columns.available.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 bg-card border rounded-lg shadow-sm ${snapshot.isDragging ? 'ring-2 ring-primary' : ''}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{item.name}</span>
                            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${getCategoryColor(item.category)}`}>
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* 3 Cột Phân Loại */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Strict / Faults */}
            <div className="flex flex-col bg-red-50/50 rounded-xl border border-red-100 p-4">
              <h3 className="font-semibold text-red-800 mb-1 flex items-center justify-between">
                Bắt buộc giống mẫu
                <span className="bg-red-200 text-red-800 text-xs px-2 py-0.5 rounded-full">{columns.strict.length}</span>
              </h3>
              <p className="text-xs text-red-600/70 mb-4 pb-2 border-b border-red-100">Coi là lỗi hỏng nếu sai lệch.</p>
              
              <Droppable droppableId="strict">
                {(provided, snapshot) => (
                  <div 
                    {...provided.droppableProps} 
                    ref={provided.innerRef} 
                    className={`flex-1 overflow-y-auto space-y-3 rounded-lg transition-colors min-h-[100px] ${snapshot.isDraggingOver ? 'bg-red-50' : ''}`}
                  >
                    {columns.strict.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 bg-card border-l-4 border-l-red-500 rounded-lg shadow-sm ${snapshot.isDragging ? 'ring-2 ring-red-400' : ''}`}
                          >
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            {/* Tolerated / Kiln Effects */}
            <div className="flex flex-col bg-amber-50/50 rounded-xl border border-amber-100 p-4">
              <h3 className="font-semibold text-amber-800 mb-1 flex items-center justify-between">
                Có dung sai (Kiln effect)
                <span className="bg-amber-200 text-amber-800 text-xs px-2 py-0.5 rounded-full">{columns.tolerated.length}</span>
              </h3>
              <p className="text-xs text-amber-600/70 mb-4 pb-2 border-b border-amber-100">Cho phép sai lệch trong khoảng.</p>
              
              <Droppable droppableId="tolerated">
                {(provided, snapshot) => (
                  <div 
                    {...provided.droppableProps} 
                    ref={provided.innerRef} 
                    className={`flex-1 overflow-y-auto space-y-3 rounded-lg transition-colors min-h-[100px] ${snapshot.isDraggingOver ? 'bg-amber-50' : ''}`}
                  >
                    {columns.tolerated.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 bg-card border-l-4 border-l-amber-500 rounded-lg shadow-sm ${snapshot.isDragging ? 'ring-2 ring-amber-400' : ''}`}
                          >
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            {/* Unique / Jade */}
            <div className="flex flex-col bg-emerald-50/50 rounded-xl border border-emerald-100 p-4">
              <h3 className="font-semibold text-emerald-800 mb-1 flex items-center justify-between">
                Độc bản (Jade)
                <span className="bg-emerald-200 text-emerald-800 text-xs px-2 py-0.5 rounded-full">{columns.unique.length}</span>
              </h3>
              <p className="text-xs text-emerald-600/70 mb-4 pb-2 border-b border-emerald-100">Càng khác biệt càng quý.</p>
              
              <Droppable droppableId="unique">
                {(provided, snapshot) => (
                  <div 
                    {...provided.droppableProps} 
                    ref={provided.innerRef} 
                    className={`flex-1 overflow-y-auto space-y-3 rounded-lg transition-colors min-h-[100px] ${snapshot.isDraggingOver ? 'bg-emerald-50' : ''}`}
                  >
                    {columns.unique.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 bg-card border-l-4 border-l-emerald-500 rounded-lg shadow-sm ${snapshot.isDragging ? 'ring-2 ring-emerald-400' : ''}`}
                          >
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
