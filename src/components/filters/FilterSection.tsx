
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X, Search, Filter } from "lucide-react";

interface FilterSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedStage: string;
  setSelectedStage: (stage: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  availableTags: string[];
  countries: string[];
}

const FilterSection = ({
  searchTerm,
  setSearchTerm,
  selectedCountry,
  setSelectedCountry,
  selectedType,
  setSelectedType,
  selectedStage,
  setSelectedStage,
  selectedTags,
  setSelectedTags,
  availableTags,
  countries,
}: FilterSectionProps) => {
  // Get the actual funding types from the database instead of hardcoded values
  const fundingTypes = [
    "Venture Fund",
    "Angel Investor", 
    "Angel Network",
    "Corporate VC",
    "Family Office",
    "Accelerator"
  ];
  
  const investmentStages = [
    "Pre-Seed",
    "Seed", 
    "Series A",
    "Series B",
    "Series C",
    "Series D+",
    "Growth",
    "Late Stage"
  ];

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCountry("");
    setSelectedType("");
    setSelectedStage("");
    setSelectedTags([]);
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-4">
      {/* Search and Main Filters Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search investors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/20 text-white h-10 text-sm focus:ring-red-500 focus:border-red-500 placeholder:text-gray-500"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white h-10 text-sm focus:ring-red-500 focus:border-red-500 w-auto min-w-[120px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent className="bg-black/95 backdrop-blur-xl border-white/20 text-white">
              <SelectItem value=" " className="text-sm">All Countries</SelectItem>
              {countries.map((country) => (
                <SelectItem
                  key={country}
                  value={country}
                  className="focus:bg-red-500/20 text-sm"
                >
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white h-10 text-sm focus:ring-red-500 focus:border-red-500 w-auto min-w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-black/95 backdrop-blur-xl border-white/20 text-white">
              <SelectItem value=" " className="text-sm">All Types</SelectItem>
              {fundingTypes.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className="focus:bg-red-500/20 text-sm"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStage} onValueChange={setSelectedStage}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white h-10 text-sm focus:ring-red-500 focus:border-red-500 w-auto min-w-[120px]">
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent className="bg-black/95 backdrop-blur-xl border-white/20 text-white">
              <SelectItem value=" " className="text-sm">All Stages</SelectItem>
              {investmentStages.map((stage) => (
                <SelectItem
                  key={stage}
                  value={stage}
                  className="focus:bg-red-500/20 text-sm"
                >
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={addTag}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white h-10 text-sm focus:ring-red-500 focus:border-red-500 w-auto min-w-[140px]">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent className="bg-black/95 backdrop-blur-xl border-white/20 text-white">
              {availableTags
                .filter((tag) => !selectedTags.includes(tag))
                .map((tag) => (
                  <SelectItem
                    key={tag}
                    value={tag}
                    className="focus:bg-red-500/20 text-sm"
                  >
                    {tag}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Button
            onClick={clearAllFilters}
            variant="ghost"
            size="sm"
            className="text-sm text-gray-400 hover:text-white hover:bg-white/10 h-10 px-4 border border-white/20"
          >
            <Filter className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              className="bg-red-500/20 text-red-300 border border-red-500/30 text-sm px-3 py-1 h-7 backdrop-blur-sm"
            >
              {tag}
              <X
                className="h-3 w-3 ml-2 cursor-pointer hover:text-white"
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSection;
