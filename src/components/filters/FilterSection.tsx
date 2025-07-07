
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
  const investmentTypes = ["VC", "Angel", "Family Office", "Corporate"];
  const investmentStages = [
    "Pre-Seed",
    "Seed",
    "Series A",
    "Series B",
    "Series C+",
    "Growth",
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
    <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 sticky top-28 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-red-500/10 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-red-400" />
            <h3 className="text-sm font-medium text-white">Filters</h3>
          </div>
          <Button
            onClick={clearAllFilters}
            variant="ghost"
            size="sm"
            className="text-xs text-gray-400 hover:text-white hover:bg-white/10 h-7 px-2"
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search investors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/20 text-white h-9 text-sm focus:ring-red-500 focus:border-red-500 placeholder:text-gray-500"
          />
        </div>

        {/* Quick Filters */}
        <div className="grid grid-cols-2 gap-2">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white h-9 text-xs focus:ring-red-500 focus:border-red-500">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent className="bg-black/95 backdrop-blur-xl border-white/20 text-white">
              <SelectItem value=" " className="text-xs">All Countries</SelectItem>
              {countries.map((country) => (
                <SelectItem
                  key={country}
                  value={country}
                  className="focus:bg-red-500/20 text-xs"
                >
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white h-9 text-xs focus:ring-red-500 focus:border-red-500">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-black/95 backdrop-blur-xl border-white/20 text-white">
              <SelectItem value=" " className="text-xs">All Types</SelectItem>
              {investmentTypes.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className="focus:bg-red-500/20 text-xs"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Filters */}
        <Accordion type="multiple" className="w-full" defaultValue={["advanced"]}>
          <AccordionItem value="advanced" className="border-white/10">
            <AccordionTrigger className="py-2 text-xs text-gray-300 hover:text-white hover:no-underline">
              Advanced Filters
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pt-2">
              <Select value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white h-9 text-xs">
                  <SelectValue placeholder="Investment Stage" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 backdrop-blur-xl border-white/20 text-white">
                  <SelectItem value=" " className="text-xs">All Stages</SelectItem>
                  {investmentStages.map((stage) => (
                    <SelectItem
                      key={stage}
                      value={stage}
                      className="focus:bg-red-500/20 text-xs"
                    >
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div>
                <Select onValueChange={addTag}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white h-9 text-xs">
                    <SelectValue placeholder="Add industry tags" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 backdrop-blur-xl border-white/20 text-white">
                    {availableTags
                      .filter((tag) => !selectedTags.includes(tag))
                      .map((tag) => (
                        <SelectItem
                          key={tag}
                          value={tag}
                          className="focus:bg-red-500/20 text-xs"
                        >
                          {tag}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-red-500/20 text-red-300 border border-red-500/30 text-xs px-2 py-1 h-6 backdrop-blur-sm"
                      >
                        {tag}
                        <X
                          className="h-3 w-3 ml-1 cursor-pointer hover:text-white"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FilterSection;
